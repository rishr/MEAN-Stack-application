const express = require('express');
const router = express.Router();

const Service = require('../services/functions');

router.get('/count', Service.getCount);
router.post('/email', Service.sendInvites);
router.post('/savesession', Service.initiateSession);
router.get('/join/:accessToken', Service.validateToken);
router.post('/checkUser', Service.validateToken);
router.get('/restrict/:sessId', Service.restrictSession);
router.get('/checkSession/:sessId', Service.checkSession);
router.post('/savedata', Service.saveData);
router.get('/getposts/:sessId', Service.getPosts);

module.exports = router;

