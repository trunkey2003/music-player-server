const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/api.controller');

/* GET users listing. */
router.get('/',apiController.show);
router.get('/us', apiController.getUsSong);
router.get('/vn', apiController.getVnSong);

module.exports = router;
