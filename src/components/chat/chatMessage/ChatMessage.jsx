import React from 'react';
import Moment from 'react-moment';

const ChatMessage = (props) => {
  switch (props.data.type) {
    case("user-mesasge"):
    const currentUserId = window.localStorage.getItem("id")
      if(props.data.userId === currentUserId){
        return(
          <div className={"my-message"}>
            <span class="message__name">You :</span>
            {props.data.text}
            <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
          </div>
        )
      }else{
        return(
          <div className={"message"}>
            <span class="message__name">{props.data.userName}</span>
            {props.data.text}
            <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
          </div>
        )
      }
    case("connect-message" || "disconnect-message"):
      return(
        <div className={"system-message"}>
          {props.data.text}
          <Moment format="HH:mm:ss">{props.data.sendAt}</Moment>
        </div>
      )
  }
}

export default ChatMessage;
