import express from 'express';
const router = express.Router();
import pool from '../database/db.js'; 
import Cars from '../database/query.js'; 

const carrosModel = new Cars(pool);


router.get('/cars', async (req, res) => {
    try {
        const cars = await carrosModel.getCars();
        res.json(cars);
    } catch (error) {
        console.error('Error al obtener carros:', error);
        res.status(500).send('Error en el servidor');
    }
});


router.get('/cars/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cars = await carrosModel.getCarsById(id);
        if (cars.length === 0) {
            res.status(404).send('Carros no encontrado');
        } else {
            res.json(usuario[0]);
        }
    } catch (error) {
        console.error('Error al obtener carros por ID:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.post('/cars', async (req, res) => {
    const { make, model, year, color } = req.body;
    try {
        const result = await carrosModel.addCars(make, model, year, color);
        res.status(201).send(`Carro agregado con ID: ${result.insertId}`);
    } catch (error) {
        console.error('Error al agregar carro:', error);
        res.status(500).send('Error en el servidor');
    }
});


router.put('/carsUpdate/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre, Usuario, Pass } = req.body;
    try {
        const result = await carrosModel.updateCars(id, make, model, year, color);
        if (result.affectedRows === 0) {
            res.status(404).send('Carro no encontrado');
        } else {
            res.send(`Carro con ID ${id} actualizado`);
        }
    } catch (error) {
        console.error('Error al actualizar carro:', error);
        res.status(500).send('Error en el servidor');
    }
});

router.delete('/carsDelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await carrosModel.deleteCars(id);
        if (result.affectedRows === 0) {
            res.status(404).send('Carro no encontrado');
        } else {
            res.send(`Carro con ID ${id} eliminado`);
        }
    } catch (error) {
        console.error('Error al eliminar carro:', error);
        res.status(500).send('Error en el servidor');
    }
});

export default router;
