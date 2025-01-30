import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { router } from './routes/routes.js'
import dotenv from 'dotenv';


// Cargar variables del archivo .env
dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000






// Middleware para urlencoded
app.use(express.json());
app.use(urlencoded({ extended: false }))

app.use(cors())

app.get('/test', (req, res) => {
	res.json({
		mensaje: 'Server activo'
	})
})

app.use(router)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});