import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

/**
 * Obtiene la ruta del archivo actual en módulos ESM.
 * @constant {string} __filename
 */
const __filename = fileURLToPath(import.meta.url);
/**
 * Obtiene el directorio del archivo actual.
 * @constant {string} __dirname
 */
const __dirname = path.dirname(__filename);

/**
 * Ruta donde se almacenarán los archivos subidos.
 * @constant {string}
 */
const uploadDir = path.join(__dirname, "../../files");
//console.log("Ruta de la carpeta de subidas:", uploadDir);

/**
 * Verifica si la carpeta de subida existe, y la crea si no.
 */
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); 
}
/**
 * Configuración del almacenamiento de archivos con Multer.
 * Define el destino y el nombre de los archivos subidos.
 * @constant {multer.StorageEngine}
 */
const storage = multer.diskStorage({
    /**
    * Define la carpeta de destino para los archivos subidos.
    * 
    * @param {Request} req - Objeto de solicitud de Express.
    * @param {Express.Multer.File} file - Archivo subido.
    * @param {function(Error|null, string)} cb - Callback para indicar la ruta de destino.
    */
    destination: (req, file, cb) => {
      // console.log("Destino configurado para Multer:", uploadDir);
        const userFolder = path.join(uploadDir, req.userId); 
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }
        cb(null, userFolder); 
    },
    /**
   * Define el nombre del archivo subido.
   * 
   * @param {Request} req - Objeto de solicitud de Express.
   * @param {Express.Multer.File} file - Archivo subido.
   * @param {function(Error|null, string)} cb - Callback para indicar el nombre del archivo.
   */
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

/**
 * Filtro para aceptar solo archivos de imagen (JPEG, PNG, GIF).
 * 
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Express.Multer.File} file - Archivo subido.
 * @param {function(Error|null, boolean)} cb - Callback para aceptar o rechazar el archivo.
 */
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Formato de archivo no válido. Solo se permiten imágenes."), false);
    }
};

/**
 * Middleware de Multer para la subida de archivos.
 * - Almacena los archivos en `storage`.
 * - Aplica `fileFilter` para validar los formatos permitidos.
 * - Limita el tamaño de los archivos a 10MB.
 * 
 * @constant {Multer}
 */
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, 
}).single("image");
