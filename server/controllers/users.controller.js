import crudMysql from '../utils/crudMysql.js';
import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

/* ------------- FUNCTIONS ----------------*/

export default {
	
	loginUser: async (req, res) => {
		try {
			// Obtener los datos del cuerpo de la solicitud
			
			const { login, pass } = req.body
			// Verificar que no hayan campos en null
			if (!login) {
				return res.status(400).json({ message: 'Faltan datos obligatorios' })
			}

			
		
			let user;

			//Función que buscará el usuario en las tablas
			async function testInTables (tableName){
				// Crear un arreglo con los valores del cuerpo de la solicitud (query)
				let values = ['email',  'pass', `${tableName}`, 'pass', pass, 'email', login, ];
				// Llamamos a loginAlumn para obtener usuarios con esos datos 
				user = await crudMysql.loginUsers(values);

				//Si el usuario no existe en la tabla, devuelve true  
				if(user[0].length === 0){
					console.log(`No está en ${tableName}`);
					return true;
				//Si el usuario nexiste en la tabla, devuelve false 
				}else{
					console.log(`Está en ${tableName}`);

				

					//Generamos el token con: {email, pass}
					generateToken(user, tableName, userName, '1000s');
					return false;
				}
			}

		
			//Generamos el token con: {email, pass}
			function generateToken(user,  name, expires){
				//Configuramos el objeto con el que construiremos el token 
				const tokenFrom = {...user[0][0], rol: rol, name: name};
				console.log('TOKEN FROM', tokenFrom);

				//Obtiene el token
				sign(tokenFrom, 'secretkey', { expiresIn: expires }, (err, token) => {
					if (err) {
						return res.status(504).json({ error: 'El usuario y/o contraseña no válido' });
					}
					// Combinar los objetos de la respuesta
					const response = {
						message: '---- Usuario logueado ------',
						token: 'Bearer ' + token
					}
					// Enviar la respuesta combinada
					return res.status(201).json(response);
				})
			}
			
			
		} catch (error) {
			console.error('Error al hacer login:', error)
			res.status(500).json({ message: 'Error al hacer login', error })
		}
	},


	dataUser: async (req, res) => {
		try {
			const value = ['users']
			const data = await crudMysql.getUsers(value)
			console.log(data[0])

			const response = [
				data.map(res => {
					const custom_response = {
						id: res.id_user,
						full_name: (res.user_name + ' ' + res.user_lastnames),
						email: res.email
					}
					return custom_response
				})
			]
			console.log(response)
			res.status(201).json(response)
		} catch (error) {
			console.error('Error: ', error)
			res.status(500).json({ message: 'Error ', error })
		}
	},
	//KAN-28
	updatePass: async (req, res) => {
		try {
			//Recogemos los datos del request
			const { email } = req.body;

			// Validamos que el email no sea nulo.
			if (!email) {
				return res.status(400).json({ message: "El campo email es obligatorio" });
			}

			// Crear un arreglo con los valores para buscar el usuario.
			const values = ["students", "email", email];

			// Llamar a la función getAlumns para verificar si el usuario existe.
			const infoAlum = await crudMysql.getAlumn(values);

			// Si el usuario no existe, devolver un mensaje de error.
			if (infoAlum.length === 0) {
				return res.status(400).json({ message: "Usuario no encontrado" });
			}

			// Si el usuario EXISTE, se genera el token.
			sign({ email }, "secretkey", { expiresIn: "15m" }, (err, token) => {
				if (err) {
					return res
						.status(500)
						.json({ message: "Error al generar el token", error: err });
				}

				// Responder con el token
				return res.status(200).json({
					message:
						"Usuario encontrado. Aquí está el token para cambiar la contraseña.",
					token: `Bearer ${token}`,
				});
			});
		} catch (e) {
			console.log("Error en updatePass: ", e);
			res.status(500).json({ message: "Error en el servidor", error: e });
		}
	},

	/*
		Ticket de Jira: KAN-29 
		Nombre: Rafa 
		Fecha: 22/01/25
		Descripcion: Funcionalidad confirmar nuevo correo funcional
	*/
	confirmPass: async (req, res) => {

		try {
			
			verify(req.params.token, 'secretkey', (err, token) => {
				//Si hay un error repondemos con él
				if (err) {
					console.log("Error en validating token: ", err);
					return res
						.status(500)
						.json({ message: "Error al validar el token", error: err });
					//Si es verificado...
				} else {
					//Extraemos el email del payload
					const { email } = token;

					//Actualizamos la base de datos
					const values = ['students', 'pass', req.body.pass, 'email', email];
					crudMysql.updateAlumnValue(values);

					// Enviamos la respuesta exitosa

					console.log("Contraseña actualizada correctamente");
					return res.status(500).json({ message: 'Contraseña actualizada correctamente.' });
				}
			})
		} catch (e) {
			console.log("Error en updatePass: ", e);
			res.status(500).json({ message: "Error en el servidor", error: e });
		}
  
  }, //KAN-43
	//KAN-38
	getLoginStudent: async (req, res) => {

		jwt.verify(req.token, 'secretkey', async (err, authData) => {
			if (err) {
				res.sendStatus(403).json({message: "Error al validar el token", error: err})
				console.log(err)
			} else {
				console.log('AUTHdATA', authData)
				const dataAlunm = [authData.rol, "dni", authData.dni];
				const infoAlumn = await crudMysql.getAlumn(dataAlunm);
				const userName = infoAlumn[0].student_name || infoAlumn[0].professor_name || infoAlumn[0].staff_name;
				const useraddress = infoAlumn[0].student_address || infoAlumn[0].professor_address || infoAlumn[0].staff_address;
				const userLastName = infoAlumn[0].student_lastnames || infoAlumn[0].professor_lastnames || infoAlumn[0].staff_lastnames;
				console.log(infoAlumn);
				if (infoAlumn.length === 0) {
					return res.status(400).json({ message: "Alumno no existe" });
				}
				else {

					const response = {
						dni: infoAlumn[0].dni,
						phone: infoAlumn[0].phone,
						full_name: (userName + ' ' + userLastName),
						email: infoAlumn[0].email,
						address: useraddress,
						rol: authData.rol
					}
					console.log(response);

					return res.status(200).json(response);

				}
			}
		})


	},

	/*
		Ticket de Jira: KAN-30 
		Nombre: Natalia
		Fecha: 24/01/25
		Descripcion: Funcionalidad confirmar primer registro de usuario 
	*/
	registerUser: async (req, res) => {
		try {
			const { info } = req.body;

			// Validamos que el email no sea nulo.
			if (!info) {
				return res.status(400).json({ message: "El campo email/DNI es obligatorio" });
			}

			let values = [];
			let updateValues = [];

			if (info.includes(".com")) {
				values = ['email', "isRegistered", 'students', 'email', info];
				updateValues = ['students', "isRegistered", true, 'email', info];
			} else {
				values = ['dni', "isRegistered", 'students', 'dni', info];
				updateValues = ['students', "isRegistered", true, 'dni', info];
			}

			const [result] = await crudMysql.setRegisteredUser(values);

			if (result.length > 0 && result[0].isRegistered === 0) {
				crudMysql.updateAlumnValue(updateValues);
				return res.status(200).json({ message: `${result[0].email} registrado con éxito!` });
			}
			return res.status(401).json({ message: `El email no está en la base de datos o ya se encuentra registrado` });
		} catch (err) {
			return res.status(500).json({ message: 'Error en el registro', err })
		}
	}
}