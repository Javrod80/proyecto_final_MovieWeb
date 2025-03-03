import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { router } from './routes/routes.js'
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./utils/Swagger/swaggerOptions.js";
import path from 'path';



// Cargar variables del archivo .env
dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(cors())
// Middleware para urlencoded
app.use(express.json());
app.use(urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'files')));


console.log("ruta",path.join(__dirname, 'files'));


// Configuración de Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));




app.get('/test', (req, res) => {
	res.json({
		mensaje: 'Server activo'
	})
})

app.use(router)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});