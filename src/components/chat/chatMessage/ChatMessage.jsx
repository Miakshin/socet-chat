import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../store/redux/chat/actions';
import PropTypes from 'prop-types';

import './ChatMessage.css';

const ChatMessage = (props) => {
  const click = (e) => {
    const targetObj={
      name: e.target.dataset.name,
      id: e.target.dataset.id
    }
    props.updateCoordinats(e.clientY, e.clientX, targetObj);
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
            data-name={props.data.userName}
            data-id={props.data.userId}
            className="message__name link"
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
  updateCoordinats: (y, x, target) => actions.updateCoordinats(y, x, target),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatMessage);
