const express = require('express');
const { login, registration } = require('../controllers/auth');

const router = express.Router();

router.post("/register", registration)
router.post("/login", login)

module.exports = router;
