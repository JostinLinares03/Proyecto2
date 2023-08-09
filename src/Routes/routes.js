const express = require('express');
const router = express.Router();

const controller =require('../Controllers/controller');

router.get('/src/Views/Servicios.hbs', controller.servicios);
router.post('/src/Views/Servicios.hbs/add',controller.addSer);
router.get('/src/Views/Servicios.hbs/delete/:id',controller.deleteSer);
router.get('/src/Views/Servicios.hbs/update/:id',controller.editS);
router.post('/test', controller.updateS);

router.get('/src/Views/Clientes.hbs', controller.clientes);
router.post('/src/Views/Clientes.hbs/add', controller.addClie);
router.get('/src/Views/Clientes.hbs/delete/:id',controller.deleteClie);
router.get('/src/Views/Clientes.hbs/update/:id',controller.editC);
router.post('/src/Views/Clientes.hbs/update', controller.updateC);

router.get('/src/Views/Ventas.hbs', controller.ventas);
router.post('/src/Views/Ventas.hbs/add', controller.addVen);
router.get('/src/Views/Ventas.hbs/delete/:id', controller.deleteVen);
router.get('/src/Views/Ventas.hbs/update/:id',controller.editV);
router.post('/src/Views/Ventas.hbs/update/', controller.updateV);

router.get('/home', controller.home);


module.exports = router;