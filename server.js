import express from 'express';
import cancionesRoutes from './routes/canciones.js';
import setupStaticFiles from './middlewares/staticFile.js';
import sequelize from './config/db.js';

const app = express();
const port = 3000;

setupStaticFiles(app);

app.use(express.json());
app.use('/', cancionesRoutes);



sequelize.sync().then(() => {
    console.log("\nConexión a la base de datos establecida con éxito.");
    app.listen(port, () => {
        console.log(`\nServidor corriendo en http://localhost:${port}`);
    });
}).catch(error => {
    console.error('No se pudo conectar a la base de datos:', error);
});