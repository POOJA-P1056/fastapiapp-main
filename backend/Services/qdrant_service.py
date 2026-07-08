import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from fastembed import TextEmbedding
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession 
from sqlalchemy.future import select
from models.job import Job

load_dotenv()

COLLECTION_NAME = "job_descriptions"
VECTOR_SIZE = 384  # BAAI/bge-small-en-v1.5 outputs 384 dimensions

# -----------------------------
# Qdrant Client
# -----------------------------
qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
)

# -----------------------------
# Embedding Model
# -----------------------------
embeddings_model = TextEmbedding("BAAI/bge-small-en-v1.5")


# -----------------------------
# Create Collection if Needed
# -----------------------------
def ensure_collection():
    collections = [c.name for c in qdrant.get_collections().collections]

    if COLLECTION_NAME not in collections:
        qdrant.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=VECTOR_SIZE,
                distance=Distance.COSINE,
            ),
        )
    else:
        info = qdrant.get_collection(COLLECTION_NAME)
        existing_size = info.config.params.vectors.size

        if existing_size != VECTOR_SIZE:
            qdrant.delete_collection(COLLECTION_NAME)

            qdrant.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=VectorParams(
                    size=VECTOR_SIZE,
                    distance=Distance.COSINE,
                ),
            )


# -----------------------------
# Embed Text
# -----------------------------
def embed_text(text: str) -> list[float]:
    return next(embeddings_model.embed([text])).tolist()


# -----------------------------
# Store Jobs in Qdrant
# -----------------------------
async def embed_all_jobs(db: AsyncSession):
    ensure_collection()
    results = await db.execute(select(Job))
    jobs = results.scalars().all()

    if not jobs:
        return 0

    points = []

    for job in jobs:
        text = f"{job.title} {job.description or ''}"

        vector = embed_text(text)

        points.append(
            PointStruct(
                id=job.id,
                vector=vector,
                payload={
                    "job_id": job.id,
                    "title": job.title,
                    "description": job.description,
                    "company": job.company.name if job.company else None,
                    "location": job.company.location if job.company else None,
                    "salary": job.salary,
                },
            )
        )

    qdrant.upsert(
        collection_name=COLLECTION_NAME,
        points=points,
    )

    return len(points)


# -----------------------------
# Semantic Search
# -----------------------------
def search_jobs(query: str, top_k: int = 5):
    ensure_collection()

    query_vector = embed_text(query)

    results = qdrant.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=top_k,
    ).points

    return [
        {
            "job_id": hit.payload.get("job_id"),
            "title": hit.payload.get("title"),
            "description": hit.payload.get("description"),
            "salary": hit.payload.get("salary"),
            "score": round(hit.score, 4),
        }
        for hit in results
    ]

# -----------------------------
# Match using Natural Language Query
# -----------------------------
def match_jobs_with_query(query: str, top_k: int = 5):
    ensure_collection()

    query_vector = embed_text(query)

    results = qdrant.query_points(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=top_k,
    ).points

    return [
        {
            "job_id": hit.payload.get("job_id"),
            "title": hit.payload.get("title"),
            "description": hit.payload.get("description"),
            "salary": hit.payload.get("salary"),
            "score": round(hit.score, 4),
        }
        for hit in results
    ]


# -----------------------------
# Match using Skills + Experience
# -----------------------------
def match_jobs_with_profile(
    skills: str,
    experience: str,
    top_k: int = 5,
):
    ensure_collection()

    profile_text = f"""
    Skills: {skills}
    Experience: {experience}
    """

    profile_vector = embed_text(profile_text)

    results = qdrant.query_points(
        collection_name=COLLECTION_NAME,
        query=profile_vector,
        limit=top_k,
    ).points

    return [
        {
            "job_id": hit.payload.get("job_id"),
            "title": hit.payload.get("title"),
            "description": hit.payload.get("description"),
            "salary": hit.payload.get("salary"),
            "match_score": round(hit.score, 4),
        }
        for hit in results
    ]