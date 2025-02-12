import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const tokenUtils = {
    // Función para generar un token JWT con los datos proporcionados
    signJwt: (tokenFrom) => {
        return new Promise((resolve, reject) => {
            jwt.sign(tokenFrom, SECRET_KEY, { expiresIn: '10000' }, (err, token) => {
                if (err) {
                    reject({ error: 'El usuario y/o contraseña no válido' });
                } else {
                    resolve({
                        message: '---- Usuario logueado correctamente ------',
                        token: 'Bearer ' + token
                    });
                }
            });
        });
    },

    // Función para verificar un token y devolver su contenido decodificado
    decodeToken: (token) => {
        try {
            // verificar el token usando la clave secreta
            return jwt.verify(token, SECRET_KEY);
        } catch (error) {
            
            console.error('Error al verificar token:', error);
            return null;
        }
    },
};

export default tokenUtils;
