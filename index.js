const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { generarAccionTutelaWord, generarAccionTutela } = require('./generadorTuteladora');

const app = express();

// Configurar CORS
app.use(cors({ origin: '*', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

// Manejadores globales para evitar que la app se detenga ante errores no controlados
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
});

// Página base
app.get('/', (req, res) => {
  res.send(`
    <h1>Generador de Acción de Tutela</h1>
    <ul>
      <li>POST /generar-pdf</li>
      <li>POST /generar-word</li>
      <li>GET /ejemplo-datos</li>
    </ul>
  `);
});

// Datos de ejemplo
app.get('/ejemplo-datos', (req, res) => {
  res.json({
    juez: { nombre: "Juez de Reparto", entidad: "E.S.D" },
    accionante: { nombre: "ANDRES PEREZ", cedula: "1004367716", ciudadExpedicion: "MANIZALES" },
    accionado: { nombre: "SURA" },
    hechos: ["NO SE ME HIZO ENTREGA DE MEDICAMENTOS", "NO SE ME ENTREGO LA AUTORIZACION PARA UNA NUEVA CITA"],
    derechosVulnerados: ["Derecho a la salud", "Derecho a la vida"],
    pretensiones: "SURA HAGA LA ENTREGA DE LOS MEDICAMENTOS ADEMAS DE ENTREGAR LAS AUTORIZACIONES PERTINENTES",
    anexos: ["MEDICAMENTOS NECESARIOS", "ORDEN MEDICA"],
    contacto: { email: "andresap2017@gmail.com", telefono: "3134902143", direccion: "Calle 49 #21-79" }
  });
});

// PDF
app.post('/generar-pdf', async (req, res) => {
  try {
    const datos = req.body;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const nombreArchivo = `accion_tutela_${timestamp}.pdf`;
    const carpeta = path.join(__dirname, 'generados');
    if (!fs.existsSync(carpeta)) fs.mkdirSync(carpeta);
    const rutaArchivo = path.join(carpeta, nombreArchivo);

    await generarAccionTutela(datos, rutaArchivo);

    res.download(rutaArchivo, nombreArchivo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/generar-word', async (req, res) => {
  try {
    const datos = req.body;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const nombreArchivo = `accion_tutela_${timestamp}.docx`;

    // Generar el buffer del documento sin escribir a disco
    const buffer = await generarAccionTutelaWord(datos);

    // Enviar para descarga directa
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
    res.setHeader('Content-Length', Buffer.byteLength(buffer));
    res.end(buffer);

  } catch (error) {
    console.error('Error al generar Word:', error);
    res.status(500).json({ error: error.message });
  }
});

// Middleware de manejo de errores de Express (último antes del listen)
app.use((err, req, res, next) => {
  console.error('❌ Error en middleware:', err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});


app.listen(3000, '0.0.0.0', () => console.log('🚀 Servidor escuchando'));
