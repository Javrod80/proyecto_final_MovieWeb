import bcrypt from 'bcryptjs';
import usersModel from '../models/MySQLModels/users.models.js';
import { sendMailResetPassword } from '../utils/Nodemailer/nodemailer.js';

export default {
    /**
     * Solicitar el restablecimiento de la contraseña y enviar el correo.
     * 
     * @param {Request} req - Objeto de solicitud de Express.
     * @param {Response} res - Objeto de respuesta de Express.
     * @returns {Promise<void>} Responde con un mensaje de éxito o error.
     */
    requestPasswordReset: async (req, res) => {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'UserId es obligatorio' });
        }

        try {
            const user = await usersModel.getUserById(userId); // Buscar usuario por email
            if (!user || user.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const email = user[0].email;
            await sendMailResetPassword(userId,email ); // Pasar el email y userId al correo

            res.status(200).json({ message: 'Correo de restablecimiento enviado exitosamente' });
        } catch (error) {
            console.error('Error al enviar el correo de restablecimiento:', error);
            res.status(500).json({ message: 'Error al enviar el correo de restablecimiento', error });
        }
    },

    /**
     * Restablecer la contraseña de un usuario usando el token JWT.
     * 
     * @param {Request} req - Objeto de solicitud de Express.
     * @param {Response} res - Objeto de respuesta de Express.
     * @returns {Promise<void>} Responde con un mensaje de éxito o error.
     * @throws {Error} Lanza un error si ocurre algún problema.
     */
    resetPassword: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Correo electrónico y nueva contraseña son obligatorios' });
            }

            // Encriptar la nueva contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("Contraseña encriptada:", hashedPassword);

            // Llamar a la función updateUser con el correo electrónico en lugar del userId
            const result = await usersModel.updateUser(email, { password: hashedPassword });
            console.log("Resultado de la actualización:", result);

            if (!result) {
                return res.status(400).json({ message: 'No se pudo actualizar la contraseña' });
            }

            res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            res.status(500).json({ message: 'Error al restablecer la contraseña', error });
        }
    }

    

};
