
MessageService = require('../services/message.js');
const chatController = require('./chat.js');
const wss = chatController.wss; 

function printError(res, error) {
    if (error.statusCode === 500) {
        res.status(500).json({ error: 'Internal Server Error' });
    } else if (error.statusCode === 401) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        res.status(404).json({ error: error.message });
    }
}

async function getMessagesByChatId(req, res) {
    const chatId = req.params.id;
    try {
      const messages = await MessageService.getMessagesByChatId(chatId);
      chatController.modifyChatsSocket(chatId);
      res.json(messages);
    } catch (error) {
        printError(res, error);         
    }
}

async function postMessage(req, res) {
    const chatId = req.params.id;
    const username = req.username;
    const content = req.body.msg.toString();
    try {
      const message = await MessageService.postMessage(chatId, username, content);
      
      res.json(message);
      
    } catch (error) {
        printError(res, error);         
    }
  }

  module.exports = {
    getMessagesByChatId,
    postMessage
};