import React from 'react';

import './Chat.css'

const Chat = () => {

  return(
    <div className="chat">
      <ul id="messages"></ul>
      <form action="" classname="chat__form">
        <input
          id="m"
          autocomplete="off"
          classname="chat__input"
        />
        <input
          classname="chat__button"
          type="button"
          value="send"
        />
      </form>
    </div>
  )
}

export default Chat;
