// Actualizar tabla user en mysql
import usersModel from '../models/MySQLModels/users.models.js';

export default {

    updateUser: async (req, res) => {
        const { userId } = req.params;
        const { user_name, user_lastnames, email, password } = req.body;

        if (!userId || !user_name || !user_lastnames || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        try {
            await usersModel.updateUser(userId, user_name, user_lastnames, email, password);
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ message: 'Error al actualizar usuario', error });
        }
    }
}