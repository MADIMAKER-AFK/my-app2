FROM node:20-alpine AS development-dependencies-env

# Crear directorio de trabajo
WORKDIR /app

# Primero copia solo los archivos de package para aprovechar la caché de Docker
COPY package*.json ./
RUN npm ci

# Copia el resto de archivos del proyecto
COPY . .

# Etapa de compilación
FROM development-dependencies-env AS build-env
RUN npm run build

# Etapa de producción
FROM node:20-alpine AS production-env

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Copiar archivos de compilación y de la API
COPY --from=build-env /app/build ./build
COPY --from=build-env /app/server.js ./
COPY --from=build-env /app/db.js ./
COPY --from=build-env /app/init-db.js ./
COPY --from=build-env /app/.env ./.env

# Exponer el puerto
EXPOSE 5173

# Inicializar la base de datos y luego iniciar la aplicación
CMD ["sh", "-c", "node init-db.js && npm run start"]