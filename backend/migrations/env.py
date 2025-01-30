import asyncio
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

from core.database import Base, engine
from models import expected_values

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def do_run_migrations(connection):
    """Run migrations inside a transaction."""
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations():
    """Asynchronously connect and run migrations."""
    async with engine.connect() as connection:
        await connection.run_sync(do_run_migrations)


def run_migrations_online():
    """Run Alembic migrations in an async environment."""
    asyncio.run(run_migrations())  # This ensures async execution

run_migrations_online()  # Call the function to run migrations