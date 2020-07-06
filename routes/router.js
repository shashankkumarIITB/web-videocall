const express = require('express');
const router = express.Router();

const user = require('../controllers/user');
const call = require('../controllers/call');

router.get('/', user.home);

router.get('/login', user.login);
router.post('/login', user.login);
router.post('/logout', user.logout);

router.get('/call/connect', call.connect);
router.get('/call/disconnect', call.disconnect);

module.exports = router;
