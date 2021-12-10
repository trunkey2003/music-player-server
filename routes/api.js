const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/api.controller');
const ApiUserController = require('../app/controllers/api-user.controller');

/* GET users listing. */
router.get('/',apiController.show);
router.get('/admin/us', apiController.getUsSong);
router.get('/admin/vn', apiController.getVnSong);
router.get('/user/:slug/songs',ApiUserController.getUserSongs);
router.get('/user/:slug', ApiUserController.getUser);

module.exports = router;
