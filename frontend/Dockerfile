# Usa una imagen base ligera de Node.js
FROM node:16-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Copia el resto del código fuente
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen ligera para servir la aplicación
FROM nginx:stable-alpine

# Copia los archivos de construcción desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]