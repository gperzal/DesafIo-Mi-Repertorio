# Mi Repertorio

"Mi Repertorio" es una aplicación web diseñada para gestionar un catálogo personal de canciones, permitiendo a los usuarios añadir, editar, visualizar y eliminar canciones de su repertorio.

## Despliegue

La aplicación está desplegada y accesible en el siguiente enlace: [Mi Repertorio en Render](https://mi-repertorio.onrender.com).

## Tecnologías Utilizadas

Este proyecto ha sido desarrollado utilizando las siguientes tecnologías:

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Sequelize](https://img.shields.io/badge/sequelize-24242d?style=for-the-badge&logo=sequelize&logoColor=2596be&labelColor=24242d) ![DOTENV](https://img.shields.io/badge/dotenv-0000?style=for-the-badge&logo=dotenv&logoColor=fff&color=b0a321) ![POSTGRES](https://img.shields.io/badge/Postgres-436590?style=for-the-badge&logo=postgresql&logoColor=fff&color=436590) ![Neon](https://img.shields.io/badge/neon-0c0c0c?style=for-the-badge&logo=https%3A%2F%2Fneon.tech%2F_next%2Fstatic%2Fsvgs%2Fe9de8fc7653111a1423e0d227c0c5e9f.svg)

## Rutas

La aplicación incluye las siguientes rutas principales:

- `GET /canciones`: Muestra todas las canciones en el repertorio.
- `GET /cancion/:id`: Muestra la información de una canción existente.
- `POST /cancion`: Permite añadir una nueva canción al repertorio.
- `PUT /cancion/:id`: Permite actualizar la información de una canción existente.
- `DELETE /cancion/:id`: Elimina una canción del repertorio.

## Instalación

Para ejecutar "Mi Repertorio" localmente, necesitas tener instalado Node.js y PostgreSQL. Sigue estos pasos para la instalación:

1. Clona el repositorio:
   `git clone https://github.com/gperzal/DesafIo-Mi-Repertorio.git`

2. Navega al directorio del proyecto:
   `cd DesafIo-Mi-Repertorio`

3. Instala las dependencias:
   `npm install`

4. Configura las variables de entorno según tu configuración de PostgreSQL en un archivo
   `.env`.

5. Ejecuta las migraciones para crear las tablas en la base de datos:
   `npx sequelize-cli db:migrate`

6. Inicia el servidor:
   `npm start`
