import React, { useState, useEffect, useRef } from 'react';

function ChatButtons({chat, handleDeleteChat}) {
  const [isDeleteChatVisible, setIsDeleteChatVisible] = useState(false);
  const dotsIconRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dotsIconRef.current && !dotsIconRef.current.contains(event.target)) {
        setIsDeleteChatVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDotsIconClick = () => {
    setIsDeleteChatVisible(!isDeleteChatVisible);
  };

  return (
    <div id="conversation_icons">
      <img className="icon" src="/icons/phone_icon.png" alt="Phone Icon" />
      <img className="icon" src="/icons/video_icon.png" alt="Video Icon" />
      <img className="icon" src="/icons/search_icon.png" alt="Search Icon" />
      <img
        id="dots_icon"
        className="icon"
        src="/icons/dots_icon.png"
        alt="Dots Icon"
        onClick={handleDotsIconClick}
        ref={dotsIconRef}
      />
      {isDeleteChatVisible && (
        <div className="delete-chat-option" onClick={() => handleDeleteChat(chat)}>Delete Chat</div>
      )}
    </div>
  );
}

export default ChatButtons;
