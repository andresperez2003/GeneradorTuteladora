# 🐳 Dockerización del Generador de Tutela

Esta aplicación Node.js está completamente dockerizada para facilitar el despliegue y desarrollo.

## 📋 Prerrequisitos

- Docker (versión 20.10 o superior)
- Docker Compose (versión 2.0 o superior)

## 🚀 Inicio Rápido

### Opción 1: Usando Docker Compose (Recomendado)

```bash
# Construir e iniciar la aplicación
docker-compose up --build

# En modo detached (segundo plano)
docker-compose up -d --build
```

### Opción 2: Usando el script de ayuda

```bash
# Iniciar aplicación
docker-scripts.bat start

# Ver todos los comandos disponibles
docker-scripts.bat
```

## 📖 Comandos Útiles

### Gestión de la Aplicación

```bash
# Construir imagen
docker-compose build

# Iniciar aplicación
docker-compose up -d

# Detener aplicación
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f generador-tutela

# Ver estado de contenedores
docker-compose ps
```

### Desarrollo

```bash
# Reiniciar después de cambios
docker-compose restart

# Acceder al shell del contenedor
docker-compose exec generador-tutela sh

# Modo desarrollo (rebuild + restart + logs)
docker-scripts.bat dev
```

### Limpieza

```bash
# Limpiar contenedores e imágenes
docker-compose down --rmi all --volumes --remove-orphans

# O usando el script
docker-scripts.bat clean
```

## 🌐 Acceso a la Aplicación

Una vez iniciada, la aplicación estará disponible en:

- **URL Principal**: http://localhost:3000
- **API Endpoints**:
  - `GET /` - Página principal con documentación
  - `GET /ejemplo-datos` - Datos de ejemplo para pruebas
  - `POST /generar-pdf` - Generar PDF de acción de tutela
  - `POST /generar-word` - Generar documento Word de acción de tutela

## 📁 Volúmenes Montados

- `./generados:/usr/src/app/generados` - Archivos PDF y Word generados
- `./logs:/usr/src/app/logs` - Logs de la aplicación (opcional)

## 🔧 Configuración

### Variables de Entorno

- `NODE_ENV=production`
- `PORT=3000`
- `TZ=America/Bogota`

### Recursos del Contenedor

- **Memoria límite**: 512MB
- **CPU límite**: 0.5 cores
- **Memoria reservada**: 256MB
- **CPU reservado**: 0.25 cores

## 🏥 Health Check

El contenedor incluye un health check que verifica cada 30 segundos si la aplicación responde correctamente.

```bash
# Verificar estado de salud
docker-compose ps
```

## 🐛 Troubleshooting

### Problema: La aplicación no inicia

```bash
# Ver logs detallados
docker-compose logs generador-tutela

# Verificar estado del contenedor
docker-compose ps
```

### Problema: No se pueden generar archivos

```bash
# Verificar permisos del directorio generados
dir generados

# Reiniciar contenedor
docker-compose restart
```

### Problema: Puerto 3000 ocupado

Modifica el puerto en `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Cambiar 3000 por 3001
```

## 🔒 Seguridad

- La aplicación ejecuta con usuario no-root (`nodejs:1001`)
- Imagen base Alpine Linux (menor superficie de ataque)
- Dependencias del sistema mínimas
- Health checks para monitoreo

## 📊 Monitoreo

```bash
# Ver uso de recursos
docker stats generador-tutela-app

# Ver logs en tiempo real
docker-compose logs -f generador-tutela
```

## 🔄 Actualización

Para actualizar la aplicación:

```bash
# Detener aplicación actual
docker-compose down

# Reconstruir con cambios
docker-compose up --build -d

# Verificar que funciona
curl http://localhost:3000/
```

## 🧪 Pruebas

Usa el script de pruebas para verificar que todo funciona:

```bash
# Ejecutar pruebas completas
test-api.bat
```

Este script probará:
1. Estado de la aplicación
2. Endpoint de datos de ejemplo
3. Generación de PDF
4. Generación de Word
