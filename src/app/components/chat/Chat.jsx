import React from 'react';

import './Chat.css'

const Chat = () => {

  return(
    <div className="chat">
      <ul id="messages"></ul>
      <form action="">
        <input id="m" autocomplete="off" /><button>Send</button>
      </form>
    </div>
  )
}

export default Chat;
