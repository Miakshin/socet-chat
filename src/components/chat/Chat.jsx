import React, { Component } from 'react';
import io from 'socket.io-client';

import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
      messages: []
    };
  }

  componentDidMount() {
    this.state.socket.on('chat message', (msg) => {
      this.setState(
        { messages : [ ...this.state.messages , msg] }
      )
    });
  }

  exit() {
    window.localStorage.clear();
    this.props.history.push('/');
  }

  sendMesage() {
    const message = document.querySelector('.mesage-form__text').value;
    this.state.socket.emit('chat message', message);
    document.querySelector('.mesage-form__text').value = '';
  }

  render() {

    const messageList = this.state.messages.map((item, i) => {
      return (
        <li className="chat__message" key={i}>{item}</li>
      )
    })

    return (
      <div className="chat">
        <header className="chat__header">
          <input
            type="button"
            value="exit"
            className="chat__out-btn"
            onClick={()=>this.exit()}
          />
        </header>
        <ul className="chat__messages" >
          {messageList || " "}
        </ul>
        <form className="mesage-form">
          <input
            type="text"
            className="mesage-form__text"
          />
          <input
            type="button"
            value="send"
            onClick={() => this.sendMesage()}
          />
        </form>
      </div>
    );
  }
}

export default Chat;
