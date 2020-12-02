import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import ChatMessage from "../ChatMessage";

function ChatRoom({ firestore, auth }) {
  const messagesReference = firestore.collection("messages");
  const query = messagesReference.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const messageEL = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, displayName } = auth.currentUser;

    await messagesReference.add({
      uid,
      displayName,
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setFormValue("");
  };

  const scrollToBottom = () => {
    if (messageEL) {
      messageEL.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chat-room">
      <div className="messages-list">
        <div>
          {messages &&
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} {...{ auth }} />
            ))}
          <div className="inView" ref={messageEL} />
        </div>
      </div>

      <form className="new-message" onSubmit={sendMessage} autoComplete="off">
        <input
          type="text"
          name="new_message"
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ChatRoom;
