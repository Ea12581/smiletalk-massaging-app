import React, { useState } from "react";

function SendMessege({ onSendMessage, selectedContact }) {
  const [messageInput, setMessageInput] = useState("");
  const ph = selectedContact ? `Message ${selectedContact}...` : "";


  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        if (messageInput.trim() !== "" && selectedContact) {
            onSendMessage(messageInput);
            setMessageInput("");
          }
    }
  };

  return (
    <div id="input_box">
      <img className="icon" src="icons/attchement_icon.png" alt="Attachment Icon" />
      <input
        type="text"
        placeholder={ ph }
        value={messageInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <div id="input_icons">
        <img className="icon" src="icons/mic_icon.png" alt="Microphone Icon" />
        <img className="icon" src="icons/emoji_icon.png" alt="Emoji Icon" />
      </div>
    </div>
  );
}

export default SendMessege;