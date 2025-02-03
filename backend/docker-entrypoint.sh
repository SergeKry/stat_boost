#!/bin/sh
set -e

# Wait for PostgreSQL to be ready
echo 'Trying to connect the database.'
while ! pg_isready -h "$POSTGRES_HOST" -p 5432 -U "$POSTGRES_USER"; do
  echo 'Waiting for PostgreSQL to be ready...'
  sleep 1
done
echo 'Database is ready.'

# Generate migrations if they don’t exist
if [ ! -d "migrations/versions" ]; then
  echo "⚠️ No migrations found! Generating migrations..."
  alembic revision --autogenerate -m "Initial migration"
fi

# Apply migrations
echo "🚀 Running Alembic migrations..."
alembic upgrade head

# Start FastAPI
echo "Starting FastAPI..."
exec uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload