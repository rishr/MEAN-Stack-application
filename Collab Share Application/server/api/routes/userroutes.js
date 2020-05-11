const express = require('express');
const router = express.Router();
// Require the contact controllers
const Controller = require('../controller/userController');
const Service = require('../services/functions');

const multer = require('multer');

router.get('/list', Controller.list);
router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/addposts', Controller.addPosts);
router.get('/getposts', Controller.getPosts);
router.get('/deleteposts/:id', Controller.deletePosts);
router.post('/update', Controller.update);
router.post('/userdata', Service.getUserData);

module.exports = router;