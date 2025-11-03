const PDFDocument = require('pdfkit');
const fs = require('fs');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType
} = require('docx');

/**
 * Genera un PDF de Acción de Tutela
 */
async function generarAccionTutela(datos = {}, rutaSalida = './accion_tutela_generada.pdf') {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(rutaSalida);
    doc.pipe(stream);

    doc.fontSize(14).text('ACCIÓN DE TUTELA', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Juez: ${datos.juez}`);
    doc.text(`Accionante: ${datos.accionante}`);
    doc.text(`Accionado: ${datos.accionado}`);
    doc.moveDown();
    doc.text(`Hechos: ${datos.hechos}`);
    doc.moveDown();
    doc.text(`Derechos vulnerados: ${datos.derechos}`);
    doc.moveDown();
    doc.text(`Pretensiones: ${datos.pretensiones}`);
    doc.end();

    stream.on('finish', () => resolve(rutaSalida));
    stream.on('error', reject);
  });
}

/**
 * Genera un documento Word (.docx) de Acción de Tutela basado en los datos proporcionados
 */
async function generarAccionTutelaWord(datos = {}, rutaSalida) {
  try {
    // Crear un documento Word completo con contenido real
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Título principal
          new Paragraph({
            children: [
              new TextRun({
                text: "ACCIÓN DE TUTELA",
                bold: true,
                size: 32
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400
            }
          }),
          
          // Información del juez
          new Paragraph({
            children: [
              new TextRun({text: `Señor(a) `,bold: true}),
              new TextRun({text: `${datos.juez?.nombre || 'JUEZ DE REPARTO'}`,bold: false})
            ],
            spacing: {
              after: 200
            }
          }),
          

          // Accionante
          new Paragraph({
            children: [
              new TextRun({text: `ACCIONANTE: `, bold: true}),
              new TextRun({text: `${datos.accionante?.nombre || 'NOMBRE DEL ACCIONANTE'}`, bold: false})
            ],
            spacing: {
              after: 100
            }
          }),

          new Paragraph({
            children: [
              new TextRun({text: `C.C. `, bold: true}),
              new TextRun({text: `${datos.accionante?.cedula || 'NÚMERO DE CÉDULA'}`, bold: false}),
              new TextRun({text: `de ${datos.accionante?.entidad || 'ENTIDAD'} `, bold: false}),
            ],
            spacing: {
              after: 200
            }
          }),

          // Accionado
          new Paragraph({
            children: [
              new TextRun({text: `ACCIONADO: `, bold: true}),
              new TextRun({text: `${datos.accionado?.nombre || 'NOMBRE DEL ACCIONADO'}`, bold: false})
            ],
            spacing: {
              after: 400
            }
          }),

          // Presentación
          new Paragraph({
            children: [
              new TextRun({
                text: "RESPETUOSAMENTE SOLICITO:",
                bold: true
              })
            ],
            spacing: {
              after: 200
            }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Que se ordene al accionado la protección inmediata de mis derechos fundamentales que han sido vulnerados, conforme a los hechos y fundamentos que a continuación expongo:"
              })
            ],
            spacing: {
              after: 400
            }
          }),

          // Hechos
          new Paragraph({
            children: [
              new TextRun({
                text: "I. HECHOS",
                bold: true
              })
            ],
            spacing: {
              before: 400,
              after: 200
            }
          }),

          ...(datos.hechos && datos.hechos.length > 0 ? datos.hechos.map((hecho, index) => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. ${hecho}`
                })
              ],
              spacing: {
                after: 100
              }
            })
          ) : [
            new Paragraph({
              children: [
                new TextRun({
                  text: "1. [Descripción de los hechos que motivan la acción de tutela]"
                })
              ],
              spacing: {
                after: 200
              }
            })
          ]),

          // Derechos vulnerados
          new Paragraph({
            children: [
              new TextRun({
                text: "II. DERECHOS VULNERADOS",
                bold: true
              })
            ],
            spacing: {
              before: 400,
              after: 200
            }
          }),

          ...(datos.derechosVulnerados && datos.derechosVulnerados.length > 0 ? datos.derechosVulnerados.map((derecho, index) => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. ${derecho}`
                })
              ],
              spacing: {
                after: 100
              }
            })
          ) : [
            new Paragraph({
              children: [
                new TextRun({
                  text: "1. [Derecho fundamental vulnerado]"
                })
              ],
              spacing: {
                after: 200
              }
            })
          ]),

          // Pretensiones
          new Paragraph({
            children: [
              new TextRun({
                text: "III. PRETENSIONES",
                bold: true
              })
            ],
            spacing: {
              before: 400,
              after: 200
            }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: datos.pretensiones || "Que se ordene al accionado [descripción de lo que se solicita] para la protección inmediata de mis derechos fundamentales."
              })
            ],
            spacing: {
              after: 400
            }
          }),

          // Juramento
          new Paragraph({
            children: [
              new TextRun({
                text: "IV. JURAMENTO",
                bold: true
              })
            ],
            spacing: {
              before: 400,
              after: 200
            }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Juro bajo la gravedad del juramento que los hechos expuestos en el presente escrito son ciertos y que no he promovido otra acción de tutela con los mismos hechos y pretensiones."
              })
            ],
            spacing: {
              after: 400
            }
          }),

          // Notificaciones
          new Paragraph({
            children: [
              new TextRun({
                text: "V. NOTIFICACIONES",
                bold: true
              })
            ],
            spacing: {
              before: 400,
              after: 200
            }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Email: ${datos.contacto?.email || 'email@ejemplo.com'}`
              })
            ],
            spacing: {
              after: 100
            }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Teléfono: ${datos.contacto?.telefono || 'Número de teléfono'}`
              })
            ],
            spacing: {
              after: 100
            }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Dirección: ${datos.contacto?.direccion || 'Dirección de notificación'}`
              })
            ],
            spacing: {
              after: 600
            }
          }),

          // Anexos
          new Paragraph({
            children: [
              new TextRun({
                text: "VI. ANEXOS",
                bold: true
              })
            ],
            spacing: {
              before: 400,
              after: 200
            }
          }),

          ...(datos.anexos && datos.anexos.length > 0 ? datos.anexos.map((anexo, index) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. ${anexo}`
                })
              ],
              spacing: {
                after: 100
              }
            })
          ) : [
            new Paragraph({
              children: [
                new TextRun({
                  text: "1. [Relación de anexos que se adjuntan]"
                })
              ],
              spacing: {
                after: 800
              }
            })
          ]),

          // Firma
          /* new Paragraph({
            children: [
              new TextRun({
                text: "Cordialmente,"
              })
            ],
            spacing: {
              before: 400,
              after: 600
            }
          }), */

          new Paragraph({
            children: [
              new TextRun({
                text: '____________________________________________',
                bold: true
              })
            ],
            spacing: {
              before: 800,
              after: 100
            }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `${datos.accionante?.nombre || 'NOMBRE DEL ACCIONANTE'}`,
                bold: true
              })
            ],
            spacing: {
              before: 100,
              after: 100
            }
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `C.C. ${datos.accionante?.cedula || 'NÚMERO DE CÉDULA'}`,
                bold: true
              })
            ],
            spacing: {
              after: 200
            }
          })
        ]
      }]
    });

    // Generar buffer del documento
    const buffer = await Packer.toBuffer(doc);
    // Escribir a disco solo si se proporciona una ruta explícita
    if (rutaSalida) {
      fs.writeFileSync(rutaSalida, buffer);
      console.log(`✅ Documento Word generado correctamente en: ${rutaSalida}`);
    }

    return buffer;

  } catch (error) {
    console.error('Error detallado:', error);
    throw new Error(`Error al generar documento Word: ${error.message}`);
  }
}

module.exports = { generarAccionTutela, generarAccionTutelaWord };
