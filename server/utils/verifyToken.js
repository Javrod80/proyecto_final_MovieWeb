import tokenUtils from './tokenUtils.js';

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        // Extraer el token de la cabecera Authorization
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;

        //console.log('Token recibido:', req.token); 

        // Decodificar el token y verificar si es válido
        const decoded = tokenUtils.decodeToken(req.token);
        if (!decoded) {
            console.error('Token no válido o ha expirado'); 
            return res.status(403).json({ message: 'Token no válido o expirado' });
        }

        // Si el token es válido, almacenar los datos decodificados en req.user
        req.user = decoded;
      //  console.log('Token decodificado:', req.user); 

        
        next();
    } else {
        console.error('No se proporcionó token'); 
        res.sendStatus(403); 
    }
};

export default verifyToken;
