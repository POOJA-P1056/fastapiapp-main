from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from dotenv import load_dotenv
import os


load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL","postgresql://postgres:password@localhost:5432/student_db")

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql_asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
#
if "Supabase.com" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.split("?")[0]
    engine = create_engine(DATABASE_URL, echo =False, connect_args={"ssl":"require"})
else: 
    engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = async_sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base = declarative_base()

async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()

#generator - uses yield and after it uses it can be used in try block
#after the use it is closed
#prevents the memory leek, connection db is closed properly
#it creates session for each request and closes it after the request
#ensure that each session has its ownrequest