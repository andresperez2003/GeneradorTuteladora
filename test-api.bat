@echo off
REM Script para probar la API del Generador de Tutela (Windows)
REM Asegúrate de que la aplicación esté corriendo en http://localhost:3000

set BASE_URL=http://localhost:3000

echo 🧪 Probando API del Generador de Tutela
echo ========================================

echo.
echo 1️⃣ Verificando estado de la aplicación...
echo 📡 Página principal
echo    GET %BASE_URL%/
curl -s -w "`n   Status: %%{http_code}`n" "%BASE_URL%/"

echo.
echo 2️⃣ Obteniendo datos de ejemplo...
echo 📡 Datos de ejemplo
echo    GET %BASE_URL%/ejemplo-datos
curl -s -w "`n   Status: %%{http_code}`n" "%BASE_URL%/ejemplo-datos"

echo.
echo 3️⃣ Generando PDF de acción de tutela...
echo 📡 Generación de PDF
echo    POST %BASE_URL%/generar-pdf
echo    ⚠️  Este test descargará un archivo PDF
set /p CONTINUE="   ¿Continuar? (y/N): "
if /i "%CONTINUE%"=="y" (
    curl -s -w "`n   Status: %%{http_code}`n" -X POST -H "Content-Type: application/json" -d "{\"juez\":{\"nombre\":\"Juez de Reparto\",\"entidad\":\"E.S.D\"},\"accionante\":{\"nombre\":\"ANDRES PEREZ\",\"cedula\":\"1004367716\",\"ciudadExpedicion\":\"MANIZALES\"},\"accionado\":{\"nombre\":\"SURA\"},\"hechos\":[\"NO SE ME HIZO ENTREGA DE MEDICAMENTOS\",\"NO SE ME ENTREGO LA AUTORIZACION PARA UNA NUEVA CITA\"],\"derechosVulnerados\":[\"Derecho a la salud\",\"Derecho a la vida\"],\"pretensiones\":\"SURA HAGA LA ENTREGA DE LOS MEDICAMENTOS ADEMAS DE ENTREGAR LAS AUTORIZACIONES PERTINENTES\",\"anexos\":[\"MEDICAMENTOS NECESARIOS\",\"ORDEN MEDICA\"],\"contacto\":{\"email\":\"andresap2017@gmail.com\",\"telefono\":\"3134902143\",\"direccion\":\"Calle 49 #21-79\"}}" "%BASE_URL%/generar-pdf"
) else (
    echo    ⏭️  Saltando test de PDF
)

echo.
echo 4️⃣ Generando documento Word de acción de tutela...
echo 📡 Generación de Word
echo    POST %BASE_URL%/generar-word
echo    ⚠️  Este test descargará un archivo Word
set /p CONTINUE2="   ¿Continuar? (y/N): "
if /i "%CONTINUE2%"=="y" (
    curl -s -w "`n   Status: %%{http_code}`n" -X POST -H "Content-Type: application/json" -d "{\"juez\":{\"nombre\":\"Juez de Reparto\",\"entidad\":\"E.S.D\"},\"accionante\":{\"nombre\":\"ANDRES PEREZ\",\"cedula\":\"1004367716\",\"ciudadExpedicion\":\"MANIZALES\"},\"accionado\":{\"nombre\":\"SURA\"},\"hechos\":[\"NO SE ME HIZO ENTREGA DE MEDICAMENTOS\",\"NO SE ME ENTREGO LA AUTORIZACION PARA UNA NUEVA CITA\"],\"derechosVulnerados\":[\"Derecho a la salud\",\"Derecho a la vida\"],\"pretensiones\":\"SURA HAGA LA ENTREGA DE LOS MEDICAMENTOS ADEMAS DE ENTREGAR LAS AUTORIZACIONES PERTINENTES\",\"anexos\":[\"MEDICAMENTOS NECESARIOS\",\"ORDEN MEDICA\"],\"contacto\":{\"email\":\"andresap2017@gmail.com\",\"telefono\":\"3134902143\",\"direccion\":\"Calle 49 #21-79\"}}" "%BASE_URL%/generar-word"
) else (
    echo    ⏭️  Saltando test de Word
)

echo.
echo ✅ Pruebas completadas!
echo.
echo 📁 Los archivos generados se guardan en: .\generados\
echo 🌐 Aplicación disponible en: %BASE_URL%
pause

