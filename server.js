const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar el envío de correos
app.post("/send-email", async (req, res) => {
  const { name, lastname, email, telephone, message } = req.body;

  // Verifica si todos los campos están presentes
  if (!name || !lastname || !email || !telephone || !message) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  try {
    // Configura el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Puedes usar otro servicio como Outlook, Yahoo, etc.
      auth: {
        user: "solutionscodeland@gmail.com", // Cambia esto a tu correo
        pass: "haja xkzs mdrm bdso", // Usa una contraseña de aplicación o similar
      },
    });

    // Configura los detalles del correo
    const mailOptions = {
      from: `${name} <${email}>`, // Aquí el correo del formulario será el remitente
      to: "solutionscodeland@gmail.com", // A dónde quieres recibir los correos
      subject: `Nuevo mensaje de ${name} ${lastname}`,
      text: `
        Nombre: ${name}
        Apellido: ${lastname}
        Correo: ${email}
        Teléfono: ${telephone}
        Mensaje: ${message}
      `,
    };

    // Envía el correo
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al enviar el correo." });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
