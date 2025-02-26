import bcrypt from 'bcryptjs';
import tokenUtils from '../utils/Token/tokenUtils.js';
import usersModel from '../models/MySQLModels/users.models.js';
import { sendMailResetPassword } from '../utils/nodemailer.js';

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
        const {  newPassword } = req.body;
        const token = req.headers['authorization'];
        

        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token y nueva contraseña son obligatorios' });
        }

        try {
            const decodedToken = tokenUtils.decodeToken(token);
            if (!decodedToken) {
                return res.status(401).json({ message: 'Token inválido' });
            }

            const userId = decodedToken.id; 
            const hashedPassword = await bcrypt.hash(newPassword, 10); 

            await usersModel.updateUser(userId, { password: hashedPassword }); 

            res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            res.status(500).json({ message: 'Error al restablecer la contraseña', error }); 
        }
}
};
