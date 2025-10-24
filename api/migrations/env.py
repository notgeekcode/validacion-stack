import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# --- Importar Base de nuestros modelos (necesario para autogenerar) ---
from app.models import Base

# Cargar config de Alembic (alembic.ini)
config = context.config

# Logging opcional
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# --- Tomar DATABASE_URL desde variables de entorno (la inyecta docker-compose) ---
database_url = os.getenv("DATABASE_URL")
if database_url:
    config.set_main_option("sqlalchemy.url", database_url)

# Metadatos objetivo para autogeneración
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Ejecutar migraciones en 'modo offline'."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
        compare_server_default=True,
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Ejecutar migraciones en 'modo online' (con conexión)."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True,
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
