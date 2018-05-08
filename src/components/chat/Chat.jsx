import React, { Component } from 'react';
import io from 'socket.io-client';
import ChatMessage from './chatMessage/ChatMessage';
import FriendsFrame from './friendsFrame/FriendsFrame';

import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(`http://localhost:3040?user-name=${window.localStorage.getItem("name")}`),
      messages: [],
      text: '',
      currentUser: window.localStorage.getItem("name"),
      friends: [],
    };
  }

  onTextChange = (e) => {
    this.setState({text: e.target.value})
  }

  componentDidMount() {
    this.state.socket.on('chat message', (msg) => {
      this.setState({ messages: [...this.state.messages, msg] });
    });
    this.state.socket.emit('user joined', this.state.currentUser)
    this.state.socket.on('user joined', (name) => {
      const messageData = {
        type: 'connect-message',
        text: `${name} is joined to chat`
      }
      this.setState({ messages: [...this.state.messages, messageData] });
    });
    this.state.socket.on('user disconnect', (name) => {
      const messageData = {
        type: 'disconnect-message',
        text: `${name} is lived chat`
      }
      console.log(messageData)
      this.setState({ messages: [...this.state.messages, messageData] });
    });
  }

  componentWillUnmount() {
    this.state.socket.emit('user disconnect', this.state.currentUser)
    this.state.socket.disconnect()
  }

  exit() {
    window.localStorage.clear();
    this.props.history.push('/');
  }

  sendMesage = (e) => {
    e.preventDefault();
    const message = document.querySelector('.mesage-form__text').value;
    const messageData = {
      type: 'user-mesasge',
      userName: window.localStorage.getItem("name"),
      userId: window.localStorage.getItem("id"),
      text: this.state.text,
      sendAt: Date.now()
    }
    this.state.socket.emit('chat message', messageData);
    this.setState({text: ''})
  }

  render() {
    const messageList = this.state.messages.map((item, i) => (
      <ChatMessage key={i} data={item}/>
    ));

    return (
      <div className="chat">
        <header className="chat__header">
          <input
            type="button"
            value="exit"
            className="chat__out-btn"
            onClick={() => this.exit()}
          />
        </header>
        <main className="chat__main">
          <ul className="chat__messages" >
            {messageList}
          </ul>
          <FriendsFrame friends={[]}/>
        </main>
        <form
          className="mesage-form"
          onSubmit={this.sendMesage}
        >
          <input
            type="text"
            className="mesage-form__text"
            onChange={this.onTextChange}
            value={this.state.text}
          />
          <input
            type="submit"
            value="send"
          />
        </form>
      </div>
    );
  }
}

export default Chat;
