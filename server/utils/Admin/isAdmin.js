import jwt from 'jsonwebtoken';
/**
 * Middleware para verificar si el usuario tiene privilegios de administrador.
 * Este middleware valida el token JWT proporcionado en los encabezados de la solicitud
 * y asegura que el usuario esté autenticado y sea un administrador.
 * 
 * @function isAdmin
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @param {Function} next - La función que pasa el control al siguiente middleware.
 * @returns {void}
 */
 function isAdmin(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
         res.status(401).send('No token provided');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).send('Invalid token');
        } else {
            req.user = decoded;
            next();
        }
    });
    
    
   
    
  
}

export default isAdmin;