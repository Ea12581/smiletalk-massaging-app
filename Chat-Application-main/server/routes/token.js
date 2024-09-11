const express = require('express');
const userController = require('../controllers/users.js');

const token = express.Router();
token.post('/', userController.getUserByUserNamePassword);

module.exports = token;