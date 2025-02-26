import usersModel from '../models/MySQLModels/users.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const { sign } = jwt;

const userController = {
    /**
     * Registra un nuevo usuario en el sistema.
     * 
     * 
     * @param {Request} req - Objeto de solicitud de Express que contiene los datos del usuario a registrar (nombre, apellidos, correo y contraseña).
     * @param {Response} res - Objeto de respuesta de Express que se utiliza para enviar una respuesta al cliente, indicando si el registro fue exitoso o hubo un error.
     * @returns {Promise<void>} Responde con un mensaje de éxito si el usuario es registrado correctamente o un mensaje de error si algo falla.
     * @throws {Error} Lanza un error si ocurre un problema durante el proceso de registro (por ejemplo, usuario ya existe).
     */
    // Registro de un nuevo usuario
    signupUser: async (req, res) => {
        // console.log("Datos recibidos:", req.body);
        const { user_name, user_lastnames, email, password, rol } = req.body;

        if (!user_name || !user_lastnames || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        try {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
            const userRol = rol || 'usuario';

            const userId = await usersModel.createUser(user_name, user_lastnames, email, hashedPassword , userRol);
            res.status(201).json({ message: 'Usuario registrado exitosamente', userId });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(409).json({ message: 'El correo ya está registrado' });
            } else {
                res.status(500).json({ message: 'Error al registrar usuario', error });
            }
        }
    },
    /**
        * Inicia sesión de un usuario en el sistema.
        * @async
        * @function loginUser
        * @param {Request} req - Objeto de solicitud de Express que contiene las credenciales del usuario (correo y contraseña).
        * @param {Response} res - Objeto de respuesta de Express utilizado para enviar una respuesta con el token de acceso si el inicio de sesión es exitoso, o un error en caso contrario.
        * @returns {Promise<void>} Responde con un token JWT si las credenciales son correctas, o un mensaje de error si las credenciales son incorrectas.
        * @throws {Error} Lanza un error si ocurre un problema durante el inicio de sesión (por ejemplo, usuario no encontrado).
        */
    // Inicio de sesión
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
        }

        try {
            const users = await usersModel.loginUser(email, password);

            if (!users || users.length === 0) {
                return res.status(401).json({ message: 'Usuario no encontrado o credenciales inválidas' });
            }

            const user = users[0];
            // Verificar la contraseña en la base de datos
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Usuario no encontrado o credenciales inválidas' });
            }

            const token = sign({ id: user.id, email: user.email, rol: user.rol }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ message: 'Inicio de sesión exitoso', token, user });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión', error });
        }
    }
};

export default userController;