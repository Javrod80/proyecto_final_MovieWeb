import usersModel from "../models/MySQLModels/users.models.js";


export default {
    deleteUser: async (req, res) => {
        const { userId } = req.params;
        try {
            if (!userId) {
                throw new Error("El ID del usuario es necesario");
            }
            const result = await usersModel.deleteUser(userId);
            res.json(result);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    }
};
