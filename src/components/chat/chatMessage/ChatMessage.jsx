import React from 'react';
import Moment from 'react-moment';

import './ChatMessage.css'

const ChatMessage = (props) => {
  switch (props.data.type) {
    case("user-mesasge"):
    const currentUserId = window.localStorage.getItem("id")
      if(props.data.userId === currentUserId){
        return(
          <div className={"my-message"}>
            <span className="message__name">You :</span>
            <p className="message__text">{props.data.text}</p>
            <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
          </div>
        )
      }else{
        return(
          <div className={"message"}>
            <span class="message__name">{props.data.userName}</span>
            <p className="message__text">{props.data.text}</p>
            <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
          </div>
        )
      }
    case("connect-message"):
      return(
        <div className={"system-message"}>
          <p className="message__text">{props.data.text}</p>
          <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
        </div>
      )
    case("disconnect-message"):
      return(
        <div className={"system-message"}>
          <p className="message__text">{props.data.text}</p>
          <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
        </div>
      )
    default: return {}
  }
}

export default ChatMessage;
