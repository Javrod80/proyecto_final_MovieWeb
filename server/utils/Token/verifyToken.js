import tokenUtils from './tokenUtils.js';
/**
 * Middleware para verificar el token JWT en las solicitudes.
 * Este middleware asegura que el token de autenticación esté presente y sea válido.
 * Si el token es válido, se decodifica y se almacena en `req.user`. Si no es válido, se devuelve un error.
 * 
 * @function verifyToken
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @param {Function} next - La función que pasa el control al siguiente middleware.
 * @returns {void}
 */

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return res.status(403).json({ message: 'Acceso denegado: Token no proporcionado' });
  }

  const bearerToken = bearerHeader.split(' ')[1];
  req.token = bearerToken;

  // Decodificar el token
  const decoded = tokenUtils.decodeToken(req.token);
  if (!decoded) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
//  console.log('Token decodificado:', decoded);
  req.userId = String(decoded.id); 
  
  if (!decoded.role) {
    decoded.rol = 'usuario';
  }
  
  req.user = decoded;
  next();
};

export default verifyToken;
