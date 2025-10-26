# api/Dockerfile
FROM python:3.12-slim

# Evita bytecode .pyc y buffer en logs
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Carpeta de trabajo
WORKDIR /app

# Copiar dependencias e instalarlas
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código fuente
COPY alembic.ini .
COPY migrations ./migrations
COPY app ./app

# Cloud Run inyecta PORT dinámicamente (usamos 8080 por convención)
EXPOSE 8080

# Iniciar Uvicorn respetando PORT (por defecto 8080)
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}"]
