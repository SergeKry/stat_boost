# Use official Python image
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Install PostgreSQL client (for pg_isready)
RUN apt-get update && apt-get install -y postgresql-client && apt-get clean

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI app files
COPY . .

# Copy and set execute permissions for entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Expose the application port
EXPOSE 8000

ENTRYPOINT ["/bin/bash", "/app/docker-entrypoint.sh"]

# Use entrypoint script as CMD
CMD ["/app/docker-entrypoint.sh"]