const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/api.controller');
const ApiUserController = require('../app/controllers/api-user.controller');

/* GET users listing. */
router.get('/user/:slug/songs', ApiUserController.validateUser ,ApiUserController.getUserSongs);
router.post('/user/:slug/songs', ApiUserController.validateUser, ApiUserController.postUserSongs);
router.delete('/user/:slug/songs', ApiUserController.deleteUserSongs);
router.get('/user/:slug', ApiUserController.validateUser, ApiUserController.getUser);
router.get('/admin/vn', apiController.getVnSong);
router.get('/admin/us', apiController.getUsSong);
router.get('/',apiController.show);


module.exports = router;
