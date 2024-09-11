Chat = require('../models/chat.js');
userService = require('../services/users.js');

async function createChat(user ,other) {
  try {
    const otherUser = await userService.getUserByUserName(other);
    if (!otherUser) {
      throw new Error('User not found');
    }

    const newChat = new Chat({
      users: [otherUser, user],
      messages: [],
    });
    const savedChat = await newChat.save();
    const id = savedChat._id.toString();
    const users = savedChat.users
    const filteredChat = { id, users };
    return filteredChat;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllChats(user) {
  try {
    const chats = await Chat.find({
      users: {
        $elemMatch: {
          username: user
        }
      }
    })
      .populate('users', 'username')
      .populate({
        path: 'messages',
        options: { sort: { id: -1 }, limit: 1 },
        populate: { path: 'user', select: 'username' }, 
      })
      .exec();
    const formattedChats = chats.map((chat) => {
      const otherUser = chat.users.find((u) => u.username !== user);
      const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

      return {
        id: chat.id.toString(),
        user: otherUser,
        lastMessage: lastMessage
      };
    });
    return formattedChats;
  } catch (error) {
    throw new Error(error);
  }
}


  async function getChatById(id) {
    try {
      const chat = await Chat.findOne({ _id: id });
  
      if (!chat) {
        throw new Error('Chat not found');
      }
  
      return {
        id: chat._id.toString(),
        users: chat.users,
        messages: chat.messages
      };
    } catch (error) {
      throw new Error('Failed to retrieve chat');
    }
  }

const getChatsByUser = async (username) => {
  try {
    const chats = await Chat.find({
      'users.username': username,
    });

    return chats;
  } catch (error) {
    console.error('Failed to get chats:', error);
    throw error;
  }
};

const getChatsByUsers = async (username1, username2) => {
  const chats = await Chat.find({
    "users.username": {
      $all: [username1, username2]
    }
  });

  if (chats.length === 0) {
    return false;
  } else {
    return true;
  }
};


const addMessage = async (chatId,msg) => {
  try {
    const chat = await Chat.findById(chatId);
    chat.messages.push(msg);
    await chat.save();
    return {
      id: chat._id.toString(),
      users: chat.users,
      messages: chat.messages
    };
  } catch (error) {
    console.error('Failed to get chats:', error);
    throw error;
  }
};

const deleteChat = async (id) => {
  try {
    const deletedChat = await Chat.findOneAndRemove({ _id: id });
    return {
      id: deletedChat._id,
      users: deletedChat.users,
      messages: deletedChat.messages
    }
  } catch (error) {
    console.error('Failed to delete chat:', error);
    throw error;
  }
};

module.exports = {
  createChat,
  getChatsByUser,
  deleteChat,
  getAllChats,
  getChatById,
  addMessage,
  getChatsByUsers
};
