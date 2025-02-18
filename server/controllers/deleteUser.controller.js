import usersModel from "../models/MySQLModels/users.models.js";


export default {
    /**
    * Elimina un usuario de la base de datos por su ID.
    * @async
    * @function deleteUser
    * @param {import("express").Request} req - Objeto de solicitud de Express, que contiene el ID del usuario en los parámetros de la ruta.
    * @param {import("express").Response} res - Objeto de respuesta de Express, que enviará el resultado o el error de la operación.
    * @returns {Promise<void>} Responde con el resultado de la eliminación o un error.
    * @throws {Error} Lanza un error si el ID del usuario no es proporcionado o si ocurre un problema durante la eliminación.
    */
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
