# Generador de Acción de Tutela

Este proyecto permite generar automáticamente documentos de Acción de Tutela en formato PDF y Word (.docx) basados en una plantilla estructurada.

## Características

- ✅ Generación automática de PDFs de Acción de Tutela
- ✅ Generación automática de documentos Word (.docx) de Acción de Tutela
- ✅ API REST para integración con frontend
- ✅ Validación de datos de entrada
- ✅ Estructura legal completa del documento
- ✅ Formato profesional y legible

## Instalación

```bash
npm install
```

## Uso

### Iniciar el servidor

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

### Endpoints de la API

#### GET `/`
Muestra información sobre la API y la estructura de datos requerida.

#### GET `/ejemplo-datos`
Obtiene un ejemplo completo de los datos necesarios para generar una Acción de Tutela.

#### POST `/generar-pdf`
Genera un PDF de Acción de Tutela basado en los datos enviados.

#### POST `/generar-word`
Genera un documento Word (.docx) de Acción de Tutela basado en los datos enviados.

**Estructura del body (JSON):**

```json
{
  "juez": {
    "nombre": "Juez de Reparto",
    "entidad": "E.S.D"
  },
  "accionante": {
    "nombre": "ANDRES PEREZ",
    "cedula": "1004367716",
    "ciudadExpedicion": "MANIZALES"
  },
  "accionado": {
    "nombre": "SURA"
  },
  "hechos": [
    "NO SE ME HIZO ENTREGA DE MEDICAMENTOS",
    "NO SE ME ENTREGO LA AUTORIZACION PARA UNA NUEVA CITA"
  ],
  "derechosVulnerados": [
    "Derecho a la salud",
    "Derecho a la vida"
  ],
  "pretensiones": "SURA HAGA LA ENTREGA DE LOS MEDICAMENTOS ADEMAS DE ENTREGAR LAS AUTORIZACIONES PERTINENTES",
  "anexos": [
    "MEDICAMENTOS NECESARIOS",
    "ORDEN MEDICA"
  ],
  "contacto": {
    "email": "andresap2017@gmail.com",
    "telefono": "3134902143",
    "direccion": "Calle 49 #21-79"
  }
}
```

### Uso programático

#### Generar PDF
```javascript
const { generarAccionTutela } = require('./generadorTuteladora');

const datos = {
  // ... datos de la acción de tutela
};

await generarAccionTutela(datos, './mi_accion_tutela.pdf');
```

#### Generar Word
```javascript
const { generarAccionTutelaWord } = require('./generadorTuteladora');

const datos = {
  // ... datos de la acción de tutela
};

await generarAccionTutelaWord(datos, './mi_accion_tutela.docx');
```

## Estructura del Documento Generado

Tanto el PDF como el documento Word generados incluyen las siguientes secciones:

1. **Encabezado** - Información del juez y referencia
2. **Identificación de las partes** - Accionante y accionado
3. **Presentación** - Datos del demandante
4. **I. HECHOS** - Descripción detallada de los hechos
5. **II. FUNDAMENTOS PROCEDIMENTALES** - Competencia, legitimación y procedencia
6. **III. FUNDAMENTOS DE DERECHO** - Argumentación legal
7. **IV. PRETENSIONES** - Solicitudes específicas
8. **V. ANEXOS** - Documentos adjuntos
9. **VI. JURAMENTO** - Declaración bajo juramento
10. **VII. NOTIFICACIONES** - Datos de contacto
11. **Firma** - Espacio para firma y cédula

## Datos Requeridos para el Frontend

Para implementar el frontend, necesitarás solicitar al usuario:

### Información del Juez
- Nombre del juez
- Entidad (E.S.D, Juzgado, etc.)

### Información del Accionante (Demandante)
- Nombre completo
- Número de cédula
- Ciudad de expedición de la cédula

### Información del Accionado (Demandado)
- Nombre de la entidad o persona demandada

### Contenido del Documento
- **Hechos**: Lista de hechos específicos (mínimo 1, máximo 10)
- **Derechos vulnerados**: Array de derechos fundamentales afectados
- **Pretensiones**: Descripción detallada de lo que se solicita
- **Anexos**: Lista de documentos adjuntos (opcional)

### Información de Contacto
- Email
- Teléfono
- Dirección física

## Ejemplo de Implementación Frontend

```javascript
// Ejemplo de cómo usar la API desde el frontend
async function generarPDF(datos) {
  try {
    const response = await fetch('http://localhost:3000/generar-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos)
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'accion_tutela.pdf';
      a.click();
    } else {
      const error = await response.json();
      console.error('Error:', error);
    }
  } catch (error) {
    console.error('Error al generar PDF:', error);
  }
}

async function generarWord(datos) {
  try {
    const response = await fetch('http://localhost:3000/generar-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos)
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'accion_tutela.docx';
      a.click();
    } else {
      const error = await response.json();
      console.error('Error:', error);
    }
  } catch (error) {
    console.error('Error al generar Word:', error);
  }
}
```

## Dependencias

- `express`: Servidor web
- `pdfkit`: Generación de PDFs
- `docx`: Generación de documentos Word (.docx)
- `cors`: Configuración de CORS para la API

## Licencia

ISC

