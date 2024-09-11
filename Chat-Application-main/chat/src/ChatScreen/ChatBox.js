import React, { useState, useEffect, useRef } from "react";
import ProfilePic from "./ProfilePic.js";
import ChatButtons from "./ChatButtons.js";
import Message from "./Message.js";
import SendMessage from "./SendMessage.js";

function ChatBox({ chat, user, selectedContact,setSelectedContact, setChat, updateChatMessages, handleDeleteChat, updateLastMessage, getMessages}) {
  const [chatMessages, setChatMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  const socket = useRef(null);
  let messages = chat ? chat.messages || [] : [];

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    socket.current.addEventListener("message", async (event) => {
      const data = JSON.parse(event.data);
      console.log(selectedContact);
      if (data.event === "chatModified" && chat && data.data.updatedChat.id === chat.id) {
        const updatedChatId = data.data.updatedChat.id;
        const updatedChatMessages = data.data.updatedChat.messages;
        setChatMessages(updatedChatMessages);
        updateChatMessages(updatedChatId, updatedChatMessages);
        messages = updatedChatMessages;
      } 
      else if(data.event === "chatRemoved"&&
      data.data.deletedChat.users.find((u) => u.username === selectedContact.username)) {
          setSelectedContact(null)
          messages = []
        }
    });

    return () => {
      socket.current.close();
    };
  }, [selectedContact,setSelectedContact,messages]);
  
  useEffect(() => {
    if (chat) {
      getMessages(chat)
        .then((data) => {
          setChatMessages(data);
        })
    }
  }, [chat]);

  useEffect(() => {
    setChatMessages(chatMessages);
  }, [chatMessages]);
  

  


  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container && chat) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);

  async function handleSendMessage(messageText) {
    if (chat) {
      const msg = { msg: messageText };
      const id = chat.id;
      const res = await fetch(`http://localhost:5000/api/Chats/${id}/Messages`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(msg),
      });
      if (res.status != 200) {
        const errorMessage = await res.text();
        alert(res.status + " " + res.statusText + "\n" + errorMessage);
      } else {
        const data = await res.json();
        const newMessage = {
          id: data.id,
          created: data.created,
          sender: {
            username: data.sender.username,
            displayName: data.sender.displayName,
            profilePic: data.sender.profilePic,
          },
          content: data.content,
        };
        const updatedMessages = [...chatMessages, newMessage];
        const updatedChat = {
          ...chat,
          messages: updatedMessages,
          lastMessage: newMessage,
        };

        setChatMessages(updatedMessages);
        updateChatMessages(chat.id, updatedMessages);
        setChat(updatedChat);
        updateLastMessage(updatedChat);
      }
    }
  }

  return (
    <div id="chat_window">
      {selectedContact && (
        <>

          <ProfilePic pic={selectedContact.profilePic}/>
          <span className="username">{selectedContact.displayName}</span>
        </>
      )}
      <ChatButtons chat={chat} handleDeleteChat={handleDeleteChat}/>
      <div id="messages" ref={messagesContainerRef}>
        {chatMessages.slice().reverse().map((message, index) => {
          const incoming = message.sender.username === user.username ? 0 : 1;
          return (
            <Message
              key={index}
              text={message.content}
              dateAndTime={message.created}
              incoming={incoming}
            />
          );
        })}
      </div>
      <SendMessage
        onSendMessage={handleSendMessage}
        selectedContact={selectedContact ? selectedContact.username : null}
      />
    </div>
  );
}


export default ChatBox;