import bcrypt from 'bcryptjs';
import usersModel from '../models/MySQLModels/users.models.js';

export default {
    /**
   * Actualiza la contraseña de un usuario en la base de datos.
   * 
   * 
   * @param {Request} req - Objeto de solicitud de Express que contiene los parámetros para la actualización del usuario, como el `userId` y la nueva contraseña.
   * @param {Response} res - Objeto de respuesta de Express que se utiliza para enviar el resultado de la actualización o un error al cliente.
   * @returns {Promise<void>} Responde con un mensaje de éxito si la contraseña se actualiza correctamente o un mensaje de error si algo falla.
   * @throws {Error} Lanza un error si ocurre algún problema durante la actualización del usuario en la base de datos.
   */

    updateUser: async (req, res) => {
        const { userId } = req.params;
        const {  password } = req.body;

     //   console.log("Body recibido:", req.body);
      //  console.log("Params recibidos:", req.params);

        if (!userId || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
       
        try {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
            await usersModel.updateUser(userId, { password: hashedPassword });
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ message: 'Error al actualizar usuario', error });
        }
    }
}