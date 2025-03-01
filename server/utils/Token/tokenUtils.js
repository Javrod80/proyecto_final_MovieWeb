import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const tokenUtils = {
    /**
     * Función para generar un token JWT con los datos proporcionados.
     * @param {Object} tokenFrom - Los datos que se incluirán en el token JWT.
     * @returns {Promise<Object>} Un objeto con el mensaje de éxito y el token JWT generado.
     */
    signJwt: (tokenFrom) => {
        return new Promise((resolve, reject) => {
            
            const payload = { ...tokenFrom, rol: tokenFrom.rol || 'usuario' };

            jwt.sign(payload, SECRET_KEY, { expiresIn: '4h' }, (err, token) => {
                if (err) {
                    reject({ error: 'No se pudo generar el token' });
                } else {
                    resolve({
                        message: 'Usuario autenticado correctamente',
                        token
                    });
                }
            });
        });
    },

    /**
     * Función para verificar un token y devolver su contenido decodificado.
     * @param {string} token - El token JWT a verificar y decodificar.
     * @returns {Object|null} El contenido decodificado del token si es válido, o null si es inválido.
     */
    decodeToken: (token) => {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (error) {
            console.error('Error al verificar token:', error.message);
            return null;
        }
    },
};

export default tokenUtils;
