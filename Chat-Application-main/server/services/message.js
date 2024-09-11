Message = require('../models/message.js')
chatService = require('../services/chat.js');
User = require('../models/users.js');
userService = require('../services/users.js')


async function getMessagesByChatId(chatId) {
  try {
    const chat = await chatService.getChatById(chatId);
  
      if (!chat) {
        throw new Error('Chat not found');
      }

      const filteredMessages = chat.messages.map((message) => {
        const {id, created, sender, content } = message;
        return {
          id: id,
          created: created,
          sender: sender,
          content: content,
        };
      });
  
      return filteredMessages;
    } catch (error) {
      console.error('Failed to retrieve messages:', error);
      throw error;
    }
  }

  async function postMessage(chatId, senderName, content) {
    try {
      const sender = await userService.getUserByUserName(senderName);
      const created = new Date();
      const tempMes = new Message({
        created: created,
        sender: sender,
        content: content
      });

      const message = {
        id: tempMes._id.toString(),
        created: tempMes.created,
        sender: {
          username: tempMes.sender.username,
          displayName: tempMes.sender.displayName,
          profilePic: tempMes.sender.profilePic
        },
        content: tempMes.content
      };
      chatService.addMessage(chatId,message);
      return message;
    } catch (error) {
      console.error('Failed to post message:', error);
      throw error;
    }
  }
  

  module.exports = {getMessagesByChatId, postMessage};
