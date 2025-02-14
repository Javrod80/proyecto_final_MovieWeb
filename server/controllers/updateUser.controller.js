import bcrypt from 'bcryptjs';
import usersModel from '../models/MySQLModels/users.models.js';

export default {

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