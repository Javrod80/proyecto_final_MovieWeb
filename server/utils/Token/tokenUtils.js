import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const tokenUtils = {
    /**
   * Función para generar un token JWT con los datos proporcionados.
   * 
   * @param {Object} tokenFrom - Los datos que se incluirán en el token JWT.
   * @returns {Promise<Object>} Un objeto con el mensaje de éxito y el token JWT generado.
   * @throws {Error} Si ocurre un error al generar el token, se rechaza la promesa con un mensaje de error.
   */
    signJwt: (tokenFrom) => {
        return new Promise((resolve, reject) => {
           
            jwt.sign(tokenFrom, SECRET_KEY, { expiresIn: '4h' }, (err, token) => {
                if (err) {
                    reject({ error: 'El usuario y/o contraseña no válido' });
                } else {
                    resolve({
                        message: '---- Usuario logueado correctamente ------',
                         token
                    });
                }
            });
        });
    },

    /**
      * Función para verificar un token y devolver su contenido decodificado.
      * 
      * @param {string} token - El token JWT a verificar y decodificar.
      * @returns {Object|null} El contenido decodificado del token si es válido, o null si es inválido.
      * @throws {Error} Si ocurre un error al verificar el token, se captura y devuelve null.
      */
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
