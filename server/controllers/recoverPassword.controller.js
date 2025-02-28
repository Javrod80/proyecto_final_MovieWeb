import usersModel from '../models/MySQLModels/users.models.js';
import sendMailResetPassword from '../utils/Nodemailer/nodemailer.js';

export default {
    recoverPassword: async (req, res) => {
        const { email } = req.body;
      //  console.log("mail recibido", email);
        if (!email) {
            return res.status(400).json({ message: 'El correo es obligatorio' });
        }

        try {
            const user = await usersModel.getUserByEmail(email); // Corrección aquí
        //    console.log("user", user);
            if (!user || user.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
           // console.log("user[0].email", user[0].email);
            await sendMailResetPassword(user[0].id,user[0].email,);
            return res.status(200).json({ message: 'Correo enviado correctamente' }); // Agregado return

        } catch (error) {
            console.error('Error al enviar el correo de restablecimiento:', error);
            res.status(500).json({ message: 'Error al enviar el correo de restablecimiento', error });
        }
    }
};
