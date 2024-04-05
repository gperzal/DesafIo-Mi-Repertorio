import Cancion from '../models/Cancion.js';

export const getAll = async (req, res) => {
  try {
    const canciones = await Cancion.findAll();
    res.json(canciones);
  } catch (error) {
    res.status(500).send(error.message);
  }
};




export const getCancionById = async (req, res) => {
  try {
    const { id } = req.params;
    const cancion = await Cancion.findByPk(id);

    if (cancion) {
      res.json(cancion);
    } else {
      res.status(404).send('Canción no encontrada');
    }
  } catch (error) {
    if (error.name === 'SequelizeDatabaseError' && error.parent.code === '22P02') {
      res.status(400).send('Formato de ID inválido');
    } else {
      res.status(500).send('Error al recuperar la canción');
    }
  }
};

export const create = async (req, res) => {
  try {
    const cancion = await Cancion.create(req.body);
    res.status(201).json(cancion);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: error.errors.map(e => e.message)
      });
    } else {
      res.status(500).send(error.message);
    }
  }
};

// export const update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [updated] = await Cancion.update(req.body, { where: { id: id } });
//     if (updated) {
//       const updatedCancion = await Cancion.findOne({ where: { id: id } });
//       res.status(200).json(updatedCancion);
//     } else {
//       throw new Error('Canción no encontrada');
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Cancion.update(req.body, { where: { id: id } });

    if (updated) {
      const updatedCancion = await Cancion.findOne({ where: { id: id } });
      res.status(200).json(updatedCancion);
    } else {
      res.status(404).send('Canción no encontrada');
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ message: error.errors.map(e => e.message) });
    } else {
      res.status(500).send(error.message);
    }
  }
};


// export const remove = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Cancion.destroy({ where: { id: id } });
//     if (deleted) {
//       res.status(204).send("Canción eliminada");
//     } else {
//       throw new Error('Canción no encontrada');
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cancion.destroy({ where: { id: id } });

    if (deleted) {
      res.status(204).send('Canción eliminada');
    } else {
      res.status(404).send('Canción no encontrada');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
