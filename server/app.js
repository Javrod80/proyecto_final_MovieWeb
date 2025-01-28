import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { router } from './routes/routes.js'

const app = express()

// Middleware para urlencoded
app.use(json())
app.use(urlencoded({ extended: false }))

app.use(cors())

app.get('/test', (req, res) => {
	res.json({
		mensaje: 'Server activo'
	})
})

app.use(router)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))