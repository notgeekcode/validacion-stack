# api/app/db.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

PG_DB = os.getenv("POSTGRES_DB", "appdb")
PG_USER = os.getenv("POSTGRES_USER", "appuser")
PG_PASS = os.getenv("POSTGRES_PASSWORD", "apppass")
PG_HOST = os.getenv("POSTGRES_HOST", "db")
PG_PORT = os.getenv("POSTGRES_PORT", "5432")

# DSN por defecto (forzado a psycopg2)
dsn = f"postgresql+psycopg2://{PG_USER}:{PG_PASS}@{PG_HOST}:{PG_PORT}/{PG_DB}"

# Si viene del entorno, lo saneamos
env_url = os.getenv("DATABASE_URL", "").strip()
if env_url:
    if "+psycopg" in env_url and "+psycopg2" not in env_url:
        print(f"[db] Aviso: reemplazando driver psycopg -> psycopg2 en DATABASE_URL: {env_url}")
        env_url = env_url.replace("+psycopg", "+psycopg2")
    dsn = env_url

print(f"[db] SQLAlchemy DSN en uso: {dsn}")

engine = create_engine(dsn, pool_pre_ping=True, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)
Base = declarative_base()
