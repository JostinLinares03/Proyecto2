const express = require('express');
const router = express.Router();


const customerController = require('../controllers/customerController');

//RUTAS SERVICIOS
router.get('/servicios', customerController.readS);
router.post('/servicios/add', customerController.createS);
router.get('servicio/delete/:id', customerController.deleteS);
router.get('/update/:id', customerController.editS);
router.post('/update/:id,', customerController.updateS)

router.get('/clientes', customerController.clientes)
router.post('/clientes/add', customerController.createC);
router.get('http://localhost:3000/clientes/delete/:id', customerController.deleteC);

router.get('/ventas', customerController.ventas)
router.post('/ventas/add', customerController.createV);
router.get('/ventas/delete/:id', customerController.deleteS)

module.exports = router;