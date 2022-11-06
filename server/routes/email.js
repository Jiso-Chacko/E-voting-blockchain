const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.route('/email').post(emailController.sendEmail);
router.route('/getVoters').get(emailController.getVoters);
router.route('/sendOtp').post(emailController.sendOtp);
router.route('/getOtp').get(emailController.getOtp);

module.exports = router;