# Dockerfile del frontend (dev)
FROM node:20-alpine

WORKDIR /app

# Copiamos primero package.json (solo ese archivo)
COPY package.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

EXPOSE 5173

# Vite dev server con host 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
