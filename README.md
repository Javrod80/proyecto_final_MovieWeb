# MovieWeb

MovieWeb es una aplicación web que permite a los usuarios explorar una amplia colección de películas, buscar información detallada sobre cada una y gestionar su propia lista de películas favoritas. Además, los usuarios pueden escribir y leer reseñas, llevar un historial de películas vistas y administrar su perfil.

## Características principales

- Registro e inicio de sesión de usuarios.
- Búsqueda de películas mediante API externa.
- Agregar y gestionar películas favoritas.
- Escribir, eliminar y leer reseñas de películas.
- Configuración de perfil de usuario (cambio de contraseña, eliminación de cuenta, subir imagen de perfil).

## Tecnologías utilizadas

**Frontend:** React, Bootstrap  
**Backend:** Express, Node.js  
**Bases de datos:**
- MySQL: Para usuarios y películas vistas.
- MongoDB: Para películas favoritas, reseñas e imágenes de perfil.

## Estructura del proyecto

```
/proyecto_final_MovieWeb
│── /client         # Aplicación frontend en React
│── /server         # Servidor backend en Express
```

### Estructura del frontend (`client`)
```
/client
│── /docs                  # Documentación JSDoc
│── /src
│   │── /adminHooks        # Componentes reutilizables para el admin (Status y Fetch)
│   │── /adminPages        # Componente (AdminDashboard)
│   │── /admincomponents   # Componentes reutilizables para AdminDashboard
│   │── /components        # Componentes reutilizables para el usuario (Favorite, Reviews, etc.)
│   │── /hooks             # Hooks personalizados para Fetch y validación de contraseña
│   │── /images            # Imágenes de vistas
│   │── /pages             # Vistas de páginas (Home, Login, NotFound)
│   │── /providers         # Contextos reutilizables (Auth, Favorites, Profile, Reviews, Search, Watched)
│   │── /styles            # Estilos CSS
│   │── /utils             # Manejadores de rutas privadas (AdminRoute y PrivateRoute)
│   │── App.js             # Componente principal de la aplicación
│   │── index.js           # Punto de entrada de React
│── /public                # Archivos estáticos como imágenes y favicon
│── package.json           # Dependencias y configuración del frontend
```

### Estructura del backend (`server`)
```
/server
│── /Diagrams              # Diagramas Dia para Admin, usuario y secuencia favoritos
│── /_test_Jmeter          # Pruebas JMeter para 50 logins de usuarios
│── /_test_                # Pruebas JEST y Selenium para Login, WatchHistory, Favorites y Reviews
│── /adminControllers      # Controladores para el Admin
│── /controllers           # Controladores para los usuarios
│── /database              # Manejo de conexiones a las bases de datos
│── /docs                  # Documentación JSDoc
│── /files                 # Carpeta para las imágenes de los usuarios
│── /models                # Modelos de bases de datos
│   │── MongoModels        # Modelos de MongoDB para usuarios
│   │── AdminMongoModels   # Modelos de MongoDB para el admin
│── /mongoCollections      # Archivos BSON y JSON de las colecciones de MongoDB
│── /mysqlScript           # Script SQL para MySQL
│── /render                # Prueba de la aplicación con Render
│── /routes                # Endpoints de la aplicación
│── /utils                 # Utilidades
│   │── Admin              # Middleware de confirmación del Admin
│   │── Nodemailer         # Middleware para envío de correos (cambio de contraseña)
│   │── Swagger            # Configuración Swagger y archivos YAML
│   │── Token              # Middleware para manejo de tokens
│   │── UploadManager      # Configuración Multer para subida de imágenes de perfil
│── /app.js                # Punto de entrada del servidor
│── /babel.config.cjs      # Configuración Babel
│── /jest.config.cjs       # Configuración JEST
│── /jsdoc.json            # Configuración JSDoc
│── package.json           # Dependencias y configuración del backend
│── .env                   # Variables de entorno (no se sube al repositorio)
```

## Instalación y configuración

### 1. Clonar el repositorio
```sh
$ git clone https://github.com/usuario/MovieWeb.git
$ cd MovieWeb
```

### 2. Configuración del backend
```sh
$ cd server
$ npm install
```
Crear un archivo `.env` en la carpeta `server` con las siguientes variables:
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
MONGO_URI=
SECRET_KEY=
```
Levantar el servidor:
```sh
$ npm start
```

### 3. Configuración del frontend
```sh
$ cd ../client
$ npm install
$ npm start
```

## Pruebas
Para ejecutar las pruebas en el backend:
```sh
$ cd server
$ npm test
```

📷 Capturas de Pantalla
![image](https://github.com/user-attachments/assets/ff631604-a006-43d9-989d-d30bbe043f97)
![image](https://github.com/user-attachments/assets/c51a6658-e181-49c8-99be-fe2b20f8cc72)
![image](https://github.com/user-attachments/assets/610c9759-ee67-481f-a308-d4389a4b5b31)
![image](https://github.com/user-attachments/assets/aeb0f950-8e7b-4977-a04d-e97233b1da9d)
![image](https://github.com/user-attachments/assets/9ac85810-1f53-409d-a328-4a036365f5cb)
![image](https://github.com/user-attachments/assets/6bd7edea-4811-4451-9cb8-9767142be2f0)
![image](https://github.com/user-attachments/assets/51c805eb-dde2-4fd0-a7bf-5b4bf8682d3d)
![image](https://github.com/user-attachments/assets/670a434a-1815-4a88-b9b9-27f485803101)
![image](https://github.com/user-attachments/assets/29c173e9-e89e-4265-af58-b9f3f502ea3f)
![image](https://github.com/user-attachments/assets/da12c726-5e5a-4087-acc3-8a0cff42edf0)
![image](https://github.com/user-attachments/assets/d84df469-d6d7-46e0-9a8b-69246ee520b2)


## Contribución
Si deseas contribuir a MovieWeb:
1. Realiza un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad (`git checkout -b nueva-funcionalidad`).
3. Realiza un commit (`git commit -m 'Agregando nueva funcionalidad'`).
4. Sube los cambios (`git push origin nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia
Este proyecto está bajo la licencia MIT.

