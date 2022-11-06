const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.route('/email').post(emailController.sendEmail);
router.route('/getVoters').get(emailController.getVoters);

module.exports = router;