import React from "react";
import moment from "moment";

function ChatMessage(props) {
  const { message, auth } = props;
  const { text, uid, displayName, createdAt } = message;
  const messageClass = uid === auth.currentUser.uid ? "send" : "received";
  const messageDate = createdAt ? moment(createdAt.toDate()).fromNow() : "";

  return (
    <div className={`message ${messageClass}`}>
      <div>
        {uid !== auth.currentUser.uid && (
          <div className="message-name">{displayName}</div>
        )}
        <div className="createdAt">{messageDate}</div>
        <div className="message-text">{text}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
