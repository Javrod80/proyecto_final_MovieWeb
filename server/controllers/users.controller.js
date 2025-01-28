import crudMysql from '../utils/crudMysql.js';
import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

/* ------------- FUNCTIONS ----------------*/

export default {
    loginUser: async (req, res) => {
        try {
            const { login, pass } = req.body;
            if (!login) {
                return res.status(400).json({ message: 'Faltan datos obligatorios' });
            }

            let user;

            async function testInTables(tableName) {
                let values = ['email', 'pass', `${tableName}`, 'pass', pass, 'email', login];
                user = await crudMysql.loginUsers(values);

                if (user[0].length === 0) {
                    console.log(`No está en ${tableName}`);
                    return true;
                } else {
                    console.log(`Está en ${tableName}`);
                    generateToken(user, tableName, '1000s');
                    return false;
                }
            }

            function generateToken(user, name, expires) {
                const tokenFrom = { ...user[0][0], rol: 'rol', name: name };
                console.log('TOKEN FROM', tokenFrom);

                sign(tokenFrom, 'secretkey', { expiresIn: expires }, (err, token) => {
                    if (err) {
                        return res.status(504).json({ error: 'El usuario y/o contraseña no válido' });
                    }
                    const response = {
                        message: '---- Usuario logueado ------',
                        token: 'Bearer ' + token
                    };
                    return res.status(201).json(response);
                });
            }
        } catch (error) {
            console.error('Error al hacer login:', error);
            res.status(500).json({ message: 'Error al hacer login', error });
        }
    },

    dataUser: async (req, res) => {
        try {
            const value = ['users'];
            const data = await crudMysql.getUsers(value);
            console.log(data[0]);

            const response = [
                data.map(res => {
                    const custom_response = {
                        id: res.id_user,
                        full_name: (res.user_name + ' ' + res.user_lastnames),
                        email: res.email
                    };
                    return custom_response;
                })
            ];
            console.log(response);
            res.status(201).json(response);
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ message: 'Error ', error });
        }
    },

    updatePass: async (req, res) => {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "El campo email es obligatorio" });
            }

            const values = ["students", "email", email];
            const infoAlum = await crudMysql.getAlumn(values);

            if (infoAlum.length === 0) {
                return res.status(400).json({ message: "Usuario no encontrado" });
            }

            sign({ email }, "secretkey", { expiresIn: "15m" }, (err, token) => {
                if (err) {
                    return res.status(500).json({ message: "Error al generar el token", error: err });
                }

                return res.status(200).json({
                    message: "Usuario encontrado. Aquí está el token para cambiar la contraseña.",
                    token: `Bearer ${token}`,
                });
            });
        } catch (e) {
            console.log("Error en updatePass: ", e);
            res.status(500).json({ message: "Error en el servidor", error: e });
        }
    },

    confirmPass: async (req, res) => {
        try {
            verify(req.params.token, 'secretkey', (err, token) => {
                if (err) {
                    console.log("Error en validating token: ", err);
                    return res.status(500).json({ message: "Error al validar el token", error: err });
                } else {
                    const { email } = token;
                    const values = ['students', 'pass', req.body.pass, 'email', email];
                    crudMysql.updateAlumnValue(values);

                    console.log("Contraseña actualizada correctamente");
                    return res.status(500).json({ message: 'Contraseña actualizada correctamente.' });
                }
            });
        } catch (e) {
            console.log("Error en updatePass: ", e);
            res.status(500).json({ message: "Error en el servidor", error: e });
        }
    },

    getLoginStudent: async (req, res) => {
        jwt.verify(req.token, 'secretkey', async (err, authData) => {
            if (err) {
                res.sendStatus(403).json({ message: "Error al validar el token", error: err });
                console.log(err);
            } else {
                console.log('AUTHdATA', authData);
                const dataAlunm = [authData.rol, "dni", authData.dni];
                const infoAlumn = await crudMysql.getAlumn(dataAlunm);
                const userName = infoAlumn[0].student_name || infoAlumn[0].professor_name || infoAlumn[0].staff_name;
                const useraddress = infoAlumn[0].student_address || infoAlumn[0].professor_address || infoAlumn[0].staff_address;
                const userLastName = infoAlumn[0].student_lastnames || infoAlumn[0].professor_lastnames || infoAlumn[0].staff_lastnames;
                console.log(infoAlumn);
                if (infoAlumn.length === 0) {
                    return res.status(400).json({ message: "Alumno no existe" });
                } else {
                    const response = {
                        dni: infoAlumn[0].dni,
                        phone: infoAlumn[0].phone,
                        full_name: (userName + ' ' + userLastName),
                        email: infoAlumn[0].email,
                        address: useraddress,
                        rol: authData.rol
                    };
                    console.log(response);
                    return res.status(200).json(response);
                }
            }
        });
    },

    registerUser: async (req, res) => {
        try {
            const { info } = req.body;
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
            return res.status(500).json({ message: 'Error en el registro', err });
        }
    }
};