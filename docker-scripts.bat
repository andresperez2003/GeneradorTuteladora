@echo off
REM Scripts de Docker para Generador de Tutela (Windows)
REM Uso: docker-scripts.bat [comando]

if "%1"=="build" (
    echo 🔨 Construyendo imagen Docker...
    docker-compose build --no-cache
    goto :eof
)

if "%1"=="start" (
    echo 🚀 Iniciando contenedor...
    docker-compose up -d
    echo ✅ Aplicación disponible en http://localhost:3000
    goto :eof
)

if "%1"=="stop" (
    echo ⏹️  Deteniendo contenedor...
    docker-compose down
    goto :eof
)

if "%1"=="restart" (
    echo 🔄 Reiniciando contenedor...
    docker-compose restart
    goto :eof
)

if "%1"=="logs" (
    echo 📋 Mostrando logs...
    docker-compose logs -f generador-tutela
    goto :eof
)

if "%1"=="status" (
    echo 📊 Estado del contenedor:
    docker-compose ps
    goto :eof
)

if "%1"=="clean" (
    echo 🧹 Limpiando contenedores e imágenes...
    docker-compose down --rmi all --volumes --remove-orphans
    goto :eof
)

if "%1"=="shell" (
    echo 🐚 Accediendo al shell del contenedor...
    docker-compose exec generador-tutela sh
    goto :eof
)

if "%1"=="dev" (
    echo 🛠️  Modo desarrollo - reconstruir y reiniciar...
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    docker-compose logs -f generador-tutela
    goto :eof
)

REM Si no se especifica comando, mostrar ayuda
echo 📖 Comandos disponibles:
echo   build    - Construir imagen Docker
echo   start    - Iniciar aplicación
echo   stop     - Detener aplicación
echo   restart  - Reiniciar aplicación
echo   logs     - Ver logs en tiempo real
echo   status   - Ver estado de contenedores
echo   clean    - Limpiar contenedores e imágenes
echo   shell    - Acceder al shell del contenedor
echo   dev      - Modo desarrollo (rebuild + start + logs)
echo.
echo Ejemplo: docker-scripts.bat start
