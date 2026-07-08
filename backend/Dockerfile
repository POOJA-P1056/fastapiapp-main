#1.Use the official lightweight Python image
FROM python:3.11-slim

# 2. Set the working directory inside in the container
WORKDIR /app

# 3. Copy the list of Python dependencies 
COPY requirements.txt 

# 4. Install the dependencies(no-cache-dirkeeps the im)
Run pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the application code to the working directory
COPY . .