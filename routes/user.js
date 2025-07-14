const express = require('express');
const router = express.Router();
const { register, login, detail } = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.get('/details', detail);

module.exports = router;