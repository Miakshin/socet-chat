import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import ChatMessage from './chatMessage/ChatMessage';
import FriendsFrame from './friendsFrame/FriendsFrame';
import ModalWindow from './modalWindow/ModalWindow';
import * as actions from '../../store/redux/user/actions';
import PropTypes from 'prop-types';

import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(`http://localhost:3040?user-name=${window.localStorage.getItem('name')}`),
      messages: [],
      text: '',
      currentUser: window.localStorage.getItem('name'),
    };

    this.onTextChange = (e) => {
      this.setState({ text: e.target.value });
    };

    this.sendMesage = (e) => {
      e.preventDefault();
      const message = document.querySelector('.mesage-form__text').value;
      const messageData = {
        type: 'user-mesasge',
        userName: window.localStorage.getItem('name'),
        userId: window.localStorage.getItem('id'),
        text: this.state.text,
        sendAt: Date.now(),
      };
      this.state.socket.emit('chat message', messageData);
      this.setState({ text: '' });
    };
  }

  componentDidMount() {
    this.state.socket.on('chat message', (msg) => {
      this.setState({ messages: [...this.state.messages, msg] });
    });
    this.state.socket.emit('user joined', this.state.currentUser);
    this.state.socket.on('user joined', (name) => {
      const messageData = {
        type: 'connect-message',
        text: `${name} is joined to chat`,
      };
      this.setState({ messages: [...this.state.messages, messageData] });
    });
    this.state.socket.on('user disconnect', (name) => {
      const messageData = {
        type: 'disconnect-message',
        text: `${name} is lived chat`,
      };
      this.setState({ messages: [...this.state.messages, messageData] });
    });
    this.props.user.name ? null : this.getUser() ;
  }

  componentWillUnmount() {
    this.state.socket.emit('user disconnect', this.state.currentUser);
    this.state.socket.disconnect();
  }

  getUser() {
    const curentUserId = window.localStorage.getItem('id');
    axios.get(`http://localhost:3040/user/${curentUserId}`)
      .then(user => this.props.updateUser(user.data));
  }

  exit() {
    window.localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    const messageList = this.state.messages.map((item, i) => (
      <ChatMessage key={i} data={item} />
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
          <FriendsFrame />
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
        <ModalWindow />
      </div>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.instanceOf({
    name: PropTypes.string,
    id: PropTypes.string,
    friends: PropTypes.array,
    login: PropTypes.string,
  }),
  updateUser: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser: user => actions.updateUser(user),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
