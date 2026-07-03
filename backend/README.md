# fastapiapp

## creating fastapi application

# CRUD operations
- Create
- Read
- Update
- Delete

# Rest API
- GET
- POST
- PUT
- DELETE

# status codes
- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed
- 409 Conflict
- 500 Internal Server Error

# Architecture of fastapi application
- Model -- tables creation
- Router -- routes requests to controllers
- Controller -- controller logic
- Service -- business logic
- Repository -- data access layer
- Middleware -- request processing pipeline(should i allow this port or not)
- schema -- pydantic models for validation

# database
## relational database
- mysql
- postgresql
- sqlite
- sql server


## non-relational database
- mongodb
- cassandra
- redis
- dynamodb

# constraints in database
- primary key -- eg: student_id
- foreign key -- eg: department_id in student table
- unique --eg: email, phonenumber
- not null --eg: name
- check -- eg: salary > 0
- default -- eg: timestamp: func.now()

# mysql example
CREATE TABLE Students(
  Student_ID int PRIMARY KEY, 
  LastName varchar(255) NOT NULL,
  FirstName varchar(255)
);

# modules
- sqlalchemy -- orm (object relational mapping)
- fastapi -- web framework
- uvicorn -- server for running fastapi application --> `uvicorn app.main:app --reload`
- psycopg2 -- postgresql driver
- pydantic -- data validation
- alembic -- database migration
- typing-extensions -- type hints

# Concepts:
- ORM
    - Object Relational Mapping --> to convert python code to sql commands without writing sql commands
- Depends
    - Dependency injection --> to inject dependencies into route handlers
- Sessionmaker
    - To create a session with the database
- SessionLocal
    - To create a session with the database for a single request
- declartive_base
    - To create a base class for all the models


pip install alembic
alembic init alembic
alembic-> env.py -> from imported model ->metadata data
alembic.ini->sqlalchemy.url to postgresql database url ---> postgresql://user:password@host:port/database_name
alembic revision --autogenerate -m "initial migration"
alembic upgrade head   



npm install -g typescript

# hashing algorithm

- argon2
- bcrypt

- python-jose[cryptography] - used to create JWT tokens

- JWT Tokens
    - Used to authenticate and authorize users.
    - Format: xxxx.yyyy.zzzz (3 parts)

    1. Header
    - Algorithm + Token Type
    - Example:
        {
        alg: HS256,
        typ: JWT
        }

    2. Payload
    - Contains data
    - Example:
        {
        user_id: 1,
        role: "admin"
        }

    3. Signature
    - Used to verify the token.
    - Signature = hash(header + payload + secretKey)

- Access Token
    - Used to access protected resources.

- Refresh Token
    - Used to refresh the access token.

- Installation:
    - pip install python-multipart



    # RBAC 
     - Role based access control 
     -> used to give different permission to different roles 
     -> eg: admin can do anything, user can do only specific things 

     use oauth2 module to implement RBAC 
     -->get_current_user() - for authenticated user 
     -->role_required() - for creating access control 
     -->create_access_token() - for creating access token with (secret_key,algorithm,payload) - token created then verify_access_token() - for decoding access token with (secret_key,algorithm,token)-token decoded then 

     Architecture 
     backend/
        app/
         -- main.py 
         --database.py 
        models/
         --users.py
         --company.py
         --job.py
        schemas/
         --users.py
         --company.py
         --job.py
        routers/
         --users.py
