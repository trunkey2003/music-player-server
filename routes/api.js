const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/api.controller');
const ApiUserController = require('../app/controllers/api-user.controller');

/* GET users listing. */
router.get('/user/:username/songs', ApiUserController.validateUser ,ApiUserController.getUserSongs);
router.post('/user/:username/songs', ApiUserController.validateUser, ApiUserController.postUserSongs);
router.delete('/user/:username/songs/:id', ApiUserController.validateUser, ApiUserController.deleteUserSongs);
router.delete('/user/:username/songid/:id/', ApiUserController.validateUser, ApiUserController.deleteUserSongsBySongID);
router.post('/user/login', ApiUserController.validateLogin);
router.get('/user/:username', ApiUserController.validateUser, ApiUserController.getUser);
router.get('/admin/vn', apiController.getVnSong);
router.get('/admin/us', apiController.getUsSong);
router.get('/',apiController.show);


module.exports = router;