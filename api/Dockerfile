# api/Dockerfile
FROM python:3.12-slim

# Evita bytecode .pyc y buffer en logs
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# (Opcional) curl sólo si lo usás en runtime; si no, podés borrar esta línea
RUN apt-get update && apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY alembic.ini .
COPY migrations ./migrations
COPY app ./app

# Cloud Run inyecta PORT; exponemos 8080 por convención
EXPOSE 8080

# Respetar $PORT (default 8080 para local)
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}"]
