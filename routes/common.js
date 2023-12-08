var express = require('express');
const router = express.Router();

const commonController = require('../controllers/commonController');

router.get('/login',commonController.common_login_get);
router.post('/login',commonController.common_login_post);

module.exports = router;