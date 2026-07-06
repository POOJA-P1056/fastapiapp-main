npm install vite@latest
node -v , npm -v
npm install -g typescript
npm create vite@latest talentspark
react->typescript->eslint->install eslint for typescript 
cd talentspark/
npm run dev
javascript -> ES6 -> arrow functions, rest and spread, template literals, destructuring, promises, async/await
dom-> document object manipulation
Virtual dom-> react virtual dom->copy of original dom which will update react dom and then updated dom will be updated in real dom
components-which are different sections of the web page    

-------------------------------------------------------
npm install axios 

ui->axios->localhost:8000(api call)->fastapi(python)->db->usereffect->setstate->rerender->ui

useeffect- which is used to call the api or which is used to fetch the data from the api automatically when the page is closed 

useState-which is used to store the data in the component and which will update the component when the data is updated or changed





# Task

SSE - Server sent events -> it is used to send the response from
server to client in form of chunks of text so that we can show the
response in form of chunks of text like chatbot ui

RAG - Retrieval Augmented Generation - it is used to increase the
accuracy of llm by providing relevant information to the llm

context-window - it is the maximum number of words that the llm can
process at a time

Langchain -> it's a framework to build llms, it's useful to connect
llm to external sources of information like database, files, websites
-> it is used to create complex workflows of llm -> like chatbot that
can answer questions about specific documents


# Task
RAG (Retrieval Augmented Generation)
It is used to increase the accuracy of the LLM by providing relevant information to the LLM.
It is used to increase the accuracy of the LLM by providing relevant information to the LLM.
How it will make chunks in a Vector DB?

Let's say we have 3 documents, each containing 100 words.

It will create 3 chunks.
Each chunk overlaps with the previous chunk by 100 characters.
So each chunk will have 500 characters.

Example chunk ranges:

0 – 499
400 – 899
800 – 1399
This chunk will be converted into vectors

Example:

I am a Python developer.
I have 3 years of experience in Python development.
I have good knowledge of Python development and I am a good Python developer.
I have good knowledge of FastAPI.

➡️ All 3 chunks will be converted into vectors.

Goldilocks Principle

- Goldilocks Principle = Just the right amount of information.

Semantic Search
It is used to find the most relevant information to the query.
It retrieves the most relevant information based on the meaning of the query, not just exact keywords.
Semantic Similarity
It is used to find the most similar vectors.
If two vectors are close to each other, they are considered similar.
Cosine Similarity
Used in Natural Language Processing (NLP).
It is used to find the similarity between two vectors.
Qdrant DB
Qdrant is a vector database.
It is used to store vectors and perform semantic search.
Corrected Notes (Interview-Friendly)
RAG (Retrieval Augmented Generation)
- Improves the accuracy of an LLM by retrieving relevant information from external sources before generating a response.

Chunking
- Large documents are split into smaller chunks.
- Chunks may overlap to preserve context.
- Example:
  Chunk 1: 0–499
  Chunk 2: 400–899
  Chunk 3: 800–1399

Embeddings
- Each chunk is converted into a vector (embedding).

Goldilocks Principle
- Retrieve only the right amount of information—not too much and not too little.

Semantic Search
- Finds information based on meaning rather than exact keyword matching.

Semantic Similarity
- Measures how similar two pieces of text are by comparing their vector embeddings.

Cosine Similarity
- Calculates the similarity between two vectors.
- A higher cosine similarity indicates more similar vectors.

Qdrant
- A vector database used to store embeddings and perform fast semantic

<!-- # Task

RAG->Retrieval Augmented Generation
It is used to increase the accuracy of llm by providing relevant information to the llm->it is used to increase the accuracy of llm by providing relevant information to the llm

How it will make chunks in vector db?
let's say we have 3 documents->one each one has 100 words
so it will make 3 chunks--each chunk will overlap with previous chunk by 100 chars->so each chunk will have 500 chars
like
0-499
400-899
800-1399

this chunk will be converted into vectors

eg:i am a python developer. i have 3 years of experience in python development.
i have good knowledge of python development and i am a good python developer.
i have good knowledge of fastapi
->will convert all the 3 chunks into vectors

goldilocks principle>just right amount of information

semantic search->it is used to find the most relevant information to the query->it is used to find the most relevant information to the query

semantic similarity
it is used to find the most similar vectors
if two vectors are close to each other then they are similar

cosine similarity->used in nlp to find the similarity between two vectors

qdrantdb is vector database
it is used to store the vectors and do the semantic search -->

embeddings model --> it is used to convert the text into vectors 

initially without rag 
user query-->send to llm-->here transformer model will answer based on its training data->response 

with rag 
user query -> embed done by embeddings model ->vector->semantic search done by qdrantdb(vector db)->retrieve relevant chunks->construct prompt->combined text+query->llm->response