const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const SessionController = require('./controller/SessionController');
const SpotController = require('./controller/SpotController');
const DashboardController = require('./controller/DashboardController');
const BookingController = require('./controller/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);
// Informações
// req.query = Acessa query params (para filtros)
// req.params = Acessa route params (para edições, delete)
// req.body = Acessar corpo da requisição (para criação, edição, etc...)

routes.get('/sessions', SessionController.show);
routes.get('/sessions', SessionController.findUserForEMail);
routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboards', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;
