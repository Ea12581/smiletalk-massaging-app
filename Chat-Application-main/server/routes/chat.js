const express = require('express');
const chatController = require('../controllers/chat.js');
const userController = require('../controllers/users.js');
const messageController = require('../controllers/message.js');

const chat = express.Router();

chat.get('/',userController.isLoggedIn,chatController.getAllChats);
chat.get('/:id',userController.isLoggedIn,chatController.getChatById);
chat.post('/', userController.isLoggedIn,chatController.createChat);
chat.delete('/:id',userController.isLoggedIn,chatController.deleteChat);
chat.get('/:id/Messages',userController.isLoggedIn,messageController.getMessagesByChatId);
chat.post('/:id/Messages',userController.isLoggedIn,messageController.postMessage);

module.exports = chat;