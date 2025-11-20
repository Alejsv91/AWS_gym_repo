FROM node:18-alpine

WORKDIR /app

# Copia solo package.json y package-lock.json primero
COPY package*.json ./

# Instala dependencias (cachea esta capa si no cambian)
RUN npm install --legacy-peer-deps

# Copia el resto del código
COPY . .

# Construye la app
RUN npm run build

# Instala serve para producción
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
