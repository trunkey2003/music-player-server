const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/api.controller');
const ApiUserController = require('../app/controllers/api-user.controller');
const Zingmp3Controller = require('../app/controllers/zingmp3.controller');

/* GET users listing. */
router.get('/user/:username/songs', ApiUserController.validateTokenCookie ,ApiUserController.validateUser ,ApiUserController.getUserSongs);
router.post('/user/:username/songs', ApiUserController.validateTokenCookie, ApiUserController.validateUser, ApiUserController.postUserSongs);
router.delete('/user/:username/songs/:id', ApiUserController.validateTokenCookie, ApiUserController.validateUser, ApiUserController.deleteUserSongs);
router.delete('/user/:username/songid/:id/', ApiUserController.validateTokenCookie, ApiUserController.validateUser, ApiUserController.deleteUserSongsBySongID);
router.get('/user/signout', ApiUserController.clearCookie);
router.post('/user/login', ApiUserController.validateLogin, ApiUserController.setToken, ApiUserController.setTokenCookie);
router.get('/user/:username', ApiUserController.validateTokenCookie, ApiUserController.validateUser, ApiUserController.getUser);
router.post('/user/signup/checkusername', ApiUserController.checkUserName);
router.post('/user/signup', ApiUserController.postUser);
router.get('/admin/vn', apiController.getVnSong);
router.get('/admin/us', apiController.getUsSong);
router.post('/zingmp3/songs', Zingmp3Controller.searchSongs);
// router.get('/cookie', ApiUserController.getCookie);
// router.post('/cookie', ApiUserController.postCookie);
router.get('/',apiController.show);


module.exports = router;