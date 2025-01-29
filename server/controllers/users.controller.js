import crudMysql from '../utils/crudMysql.js';
import jwt from 'jsonwebtoken';

const { sign } = jwt;

const userController = {
    // Registro de un nuevo usuario
    signupUser: async (req, res) => {
        const { user_name, user_lastnames, email, password } = req.body;

        if (!user_name || !user_lastnames || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        try {
         
            const values = [user_name, user_lastnames, email, password, new Date()];
            const userId = await crudMysql.createUser(values);

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

    // Inicio de sesión
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
        }

        try {
            // Llamamos a la función `loginUsers` del CRUD para obtener el usuario por su correo
            const values = ['user_name', 'user_lastnames', 'email', 'password', 'users', 'email', email, 'password', password];

            const users = await crudMysql.loginUsers(values);

            console.log("Usuarios encontrados:", users);

            if (users.length === 0) {
                return res.status(401).json({ message: 'Usuario no encontrado o credenciales inválidas' });
            }

            const user = users[0];

           
            if (password !== user.password) {
                return res.status(401).json({ message: 'Usuario no encontrado o credenciales inválidas' });
            }

            // Generación del token JWT
            const token = sign({ id: user.id, email: user.email }, 'secretkey', { expiresIn: '1h' });

            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                token: `Bearer ${token}`,
                user: { id: user.id, email: user.email, user_name: user.user_name },
            });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión', error });
        }
    },
};

export default userController;
