import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../store/redux/chat/actions';
import PropTypes from 'prop-types';

import './ChatMessage.css';

const ChatMessage = (props) => {
  const click = (e) => {
    console.log(e.clientY, e.clientX);
    props.updateCoordinats(e.clientY, e.clientX);
  };

  switch (props.data.type) {
    case ('user-mesasge'):
      const currentUserId = window.localStorage.getItem('id');
      if (props.data.userId === currentUserId) {
        return (
          <div className="my-message">
            <span className="message__name">You :</span>
            <p className="message__text">{props.data.text}</p>
            <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
          </div>
        );
      }
      return (
        <div className="message">
          <span
            className="message__name"
            onClick={click}
          >{props.data.userName}
          </span>
          <p className="message__text">{props.data.text}</p>
          <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
        </div>
      );

    case ('connect-message'):
      return (
        <div className="system-message">
          <p className="message__text">{props.data.text}</p>
          <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
        </div>
      );
    case ('disconnect-message'):
      return (
        <div className="system-message">
          <p className="message__text">{props.data.text}</p>
          <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
        </div>
      );
    default: return {};
  }
};

ChatMessage.propTypes = {
  data: PropTypes.object,
};

const mapStateToProps = state => ({
  chat: state.chat,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCoordinats: (y, x) => actions.updateCoordinats(y, x),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatMessage);
