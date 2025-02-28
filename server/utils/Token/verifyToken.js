import tokenUtils from './tokenUtils.js';

const verifyToken = (req, res, next) => {
    /**
 * Middleware para verificar la validez del token JWT en las solicitudes.
 * 
 * @param {Object} req - El objeto de solicitud de Express. Se agrega un token decodificado a `req.user` si el token es válido.
 * @param {Object} res - El objeto de respuesta de Express. Se envía un código de estado 403 si el token no es válido o está ausente.
 * @param {Function} next - La función de siguiente middleware que se ejecuta si el token es válido.
 * @returns {void} No devuelve valor, solo modifica el objeto `req` y, si el token es válido, llama a `next()`.
 * @throws {Error} Si no se proporciona un token o si el token es inválido, responde con un código de estado 403.
 */

   // console.log('Verificando token..., req.headers:', req.headers);
    const bearerHeader = req.headers['authorization'];
   // console.log('Authorization Header:', bearerHeader);

    if (typeof bearerHeader !== 'undefined') {
        // Extraer el token de la cabecera Authorization
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;

      //  console.log('Token recibido:', req.token); 

        // Decodificar el token y verificar si es válido
        const decoded = tokenUtils.decodeToken(req.token);
        if (!decoded) {
           // console.error('Token no válido o ha expirado');
            return res.status(403).json({ message: 'Token no válido o expirado' });
        }
        const currentTime = Math.floor(Date.now() / 1000); 
        if (decoded.exp < currentTime) {
          //  console.log('El token ha expirado');
            return res.status(403).json({ message: 'Token ha expirado' });
        }
       
        req.user = decoded;
          //console.log('Token decodificado:', req.user); 
       // console.log(new Date().toString());



        next();
    } else {
        console.error('No se proporcionó token ');
        res.sendStatus(403);
    }
};

export default verifyToken;