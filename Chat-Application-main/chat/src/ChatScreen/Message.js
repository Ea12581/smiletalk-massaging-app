function Message({ text, dateAndTime, incoming }) {
    const messageClass = incoming ? "message incoming_message" : "message user_message";
    const messageTineClass = incoming ? "message_time" : "message_time_user";
    const dateTime = new Date(dateAndTime);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    const dateTimeFormatted = `${date} ${time}`;
    return (
      <div className="msg_and_time">
        <div className={messageClass}>
          <p>{text}</p>
        </div>
        <span className={messageTineClass}>{dateTimeFormatted}</span>
      </div>
    );
  }
  
  export default Message;
  