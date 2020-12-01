import React from "react";

function ChatMessage(props) {
  const { message, auth } = props;
  const { text, uid, displayName } = message;
  const messageClass = uid === auth.currentUser.uid ? "send" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <div className="message-name">{displayName}</div>
      <div className="message-text">{text}</div>
    </div>
  );
}

export default ChatMessage;
