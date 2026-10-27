# Usar imagen oficial de Node.js LTS Alpine para menor tamaño
# (pdfkit, pdf-lib y docx son JavaScript puro, no requieren librerías del sistema)
FROM node:20-alpine

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de dependencias primero para aprovechar cache de Docker
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --omit=dev && npm cache clean --force

# Copiar código fuente (la imagen node ya trae el usuario no-root "node")
COPY --chown=node:node . .

# Crear directorio para archivos generados
RUN mkdir -p /usr/src/app/generados && \
    chown -R node:node /usr/src/app

# Cambiar a usuario no-root
USER node

# Exponer puerto
EXPOSE 3000

# Variables de entorno (las plataformas como Render/Railway sobrescriben PORT)
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando de inicio
CMD ["node", "index.js"]
