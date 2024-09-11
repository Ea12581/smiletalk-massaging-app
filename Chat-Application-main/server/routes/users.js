const express = require('express');
const userController = require('../controllers/users.js');

const users = express.Router();

users.post('/', userController.createUser);
users.get('/:userName', userController.isLoggedIn,userController.getUserByUserName);

module.exports = users;
