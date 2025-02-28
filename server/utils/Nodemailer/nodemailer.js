import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import tokenUtils from '../Token/tokenUtils.js'; // 
dotenv.config();

// Configuración del transporte
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false 
    }
});

//  función para enviar el correo de restablecimiento de contraseña
export async function sendMailResetPassword(userId, mailUser) {
    try {
        const token = await tokenUtils.signJwt({ mail: mailUser });
        const url = `http://localhost:3000/reset-password?token=${token.token}`;

        // Configurar el objeto mailOptions
        const mailOptions = {
            from: 'no-reply@ejemplo.com',
            to: mailUser,
            subject: 'Restablecimiento de contraseña',
            text: `Para restablecer su contraseña, haga clic en el siguiente enlace: ${url}`,
            html: `<p>Para restablecer su contraseña, haga clic en el siguiente enlace: <a href="${url}">Restablecer contraseña</a></p>`
        };

        // Enviar el email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email enviado:', info.response);
            }
        });
    } catch (error) {
        console.log('Error al generar el token o enviar el correo:', error);
    }
}


export default sendMailResetPassword;