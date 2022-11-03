const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.route('/email').post(emailController.sendEmail)

module.exports = router;