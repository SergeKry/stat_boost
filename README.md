# stat_boost

Technology stack:
- FastAPI
- React
- PostgreSQL

The idea of the project is to take data from different places. Calculate player statistics and provide it to the user in human-friendly way using React app.

Running project in docker:
- register application for WG API and get application key to be able to use access to player's data.
- add variables in .env file based on .env example (including Application key that you generated)
- run `docker-compose build --no-cache`
- run `docker-compose up`
- API swagger docs are available at localhost:8000/docs
- React frontend is available at localhost:5173
