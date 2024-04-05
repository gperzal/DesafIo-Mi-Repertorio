import express from 'express';
import { getAll, getCancionById, create, update, remove } from '../controllers/cancionesController.js';

const router = express.Router();

router.get('/canciones', getAll);
router.post('/cancion', create);
 // Nota el cambio aquí para capturar el `id`
router.get('/cancion/:id', getCancionById);
router.put('/cancion/:id', update);
router.delete('/cancion/:id', remove); 

export default router;
