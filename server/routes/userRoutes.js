const express = require('express');
const { authUser } = require('../controllers/userControllers');
const { protect } = require('../config/authMiddleware');
const router = express.Router();

router.post('/login', authUser);

module.exports = router;
