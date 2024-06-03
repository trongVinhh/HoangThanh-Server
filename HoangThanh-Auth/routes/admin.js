const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/adminController');

router.get('/', adminController.signIn);

module.exports = router;