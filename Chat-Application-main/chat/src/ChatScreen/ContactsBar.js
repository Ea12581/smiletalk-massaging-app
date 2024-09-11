import React, { useState, useRef, useEffect } from "react";
import Contact from "./Contact.js";

function ContactsBar({ user, onChatSelect, onAddChat, fetchedChats, setFetchedChats, getMessages }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const overlayRef = useRef(null);
  const socket = useRef(null);
  const addChatTriggered = useRef(false);


  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    socket.current.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      const chat = data.data.chat;
      if (data.event === "chatAdded" && !addChatTriggered.current &&
       chat.users.find((u) => u.username === user.username)) {
        const existingChat = fetchedChats.find((c) => c.id === chat.id);
        if (existingChat) {
          return;
        }
        const otherUser = chat.users.find((u) => u.username !== user.username);
        const newChat = {
          id: chat.id,
          user: {
            username: otherUser.username,
            displayName: otherUser.displayName,
            profilePic: otherUser.profilePic
          },
          lastMessage: null
        };

        setFetchedChats((prevChats) => [...prevChats, newChat]);
        onAddChat(newChat);
      }else if( data.event === "chatModified" || data.event === "chatRemoved"){
        getChats();
      }
    });

    return () => {
      socket.current.close();
    };
  }, []);


  useEffect(() => {
    getChats();
  }, []);

  async function getLastMessage(chat) {
    const messages = await getMessages(chat);
    if (messages && messages.length > 0) {
      messages.sort((a, b) => b.id - a.id);
      return messages[0];
    }
    return null;
  }

  async function handleAddChat() {
  addChatTriggered.current = true;
  const contact = { username: newContactName };
    const res = await fetch('http://localhost:5000/api/Chats', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      'body': JSON.stringify(contact)
    });
    if (res.status != 200){
      const errorMessage = await res.text();
      alert(res.status + " " + res.statusText + "\n" + errorMessage);
    } else {
      const data = await res.json();
      const lastMessage = await getLastMessage(data);
      const newChat = {
        id: data.id,
        user:
        {
          "username": data.user.username,
          "displayName": data.user.displayName,
          "profilePic": data.user.profilePic
        },
        lastMessage: lastMessage
      }
      setPopupVisible(false);
      setFetchedChats((prevChats) => [...prevChats, newChat]);
      onAddChat(newChat);
    };
    addChatTriggered.current = false;
  }

  async function handleChatClick(clickedChat) {
    const id = clickedChat.id;
    const res = await fetch(`http://localhost:5000/api/Chats/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    if (res.status != 200){
      const errorMessage = await res.text();
      alert(res.status + " " + res.statusText + "\n" + errorMessage);
    } else {
      const data = await res.json();
      onChatSelect(data);
    }
  }

  const handlePopupToggle = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleOverlayClick = () => {
    if (isPopupVisible) {
      return;
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      overlayRef.current.addEventListener("click", handleOverlayClick);
    }
    return () => {
      if (overlayRef.current) {
        overlayRef.current.removeEventListener("click", handleOverlayClick);
      }
    };
  }, [isPopupVisible]);

  async function getChats() {
    try {
        const res = await fetch('http://localhost:5000/api/Chats', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });
      if (res.status != 200){
        const errorMessage = await res.text();
        alert(res.status + " " + res.statusText + "\n" + errorMessage);
      } else {
        const data = await res.json();
        const updatedChats = [];
        for (const chat of data) {
          const lastMessage = chat.lastMessage;

          const updatedChat = {
            ...chat,
            lastMessage: lastMessage,
          };
          updatedChats.push(updatedChat);
        }
        setFetchedChats(updatedChats);
        return data;
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  
  return (
    <div id="chats_bar">
      <div id="chat_bar_line1">
        <span id="chats_title">Contacts</span>
        <span id="more_icon" onClick={handlePopupToggle}>
          +
        </span>
      </div>
      <div id="chats">
        {fetchedChats &&
         fetchedChats.map((chat) => (
            <Contact
            key={chat.id}
            chat={chat}
            onClick={() => handleChatClick(chat)}

            />
        ))}
        {/* Render the popup if exists */}
        {isPopupVisible && (
          <div>
            <div className="overlay" ref={overlayRef}></div>
            <div id="popup">
              <div id="popup_content">
                <p>Add a new contact</p>
                <span>Name</span>
                <input
                  type="text"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                />
                <button id="cancel_button" onClick={() => setPopupVisible(false)}>
                  Cancel
                </button>
                <button id="add_button" onClick={handleAddChat}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactsBar;
