import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cancion = sequelize.define('Cancion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El título de la canción no puede estar vacío"
            },
            len: {
                args: [1, 50],
                msg: "El título de la canción debe tener entre 1 y 50 caracteres"
            }
        }
    },
    artista: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El nombre del artista no puede estar vacío"
            },
            len: {
                args: [1, 50],
                msg: "El nombre del artista debe tener entre 1 y 50 caracteres"
            }
        }
    },
    tono: {
        type: DataTypes.STRING(10),
        validate: {
            esAcorde(value) {
                const acordesValidos = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
                    'Am', 'Bm', 'Cm', 'Dm', 'Em', 'Fm', 'Gm',
                    'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7',
                    'A#', 'C#', 'D#', 'F#', 'G#',
                    'A#m', 'C#m', 'D#m', 'F#m', 'G#m',
                    'Bb', 'Db', 'Eb', 'Gb', 'Ab',
                    'Bbm', 'Dbm', 'Ebm', 'Gbm', 'Abm'];
                if (!acordesValidos.includes(value)) {
                    throw new Error("El tono debe ser un acorde mayor o menor común");
                }
            }
        }
    },
}, {
    timestamps: false,
    tableName: 'canciones'
});

export default Cancion;
