import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from '../../../store/redux/chat/actions';
import * as userActions from '../../../store/redux/user/actions';
import axios from 'axios';

import './ModalWindow.css'

const ModalWindow = (props) => {

  const addUserToFriends = () => {
    const data = {
      id: props.user.id || window.localStorage.getItem("id"),
      target: props.chat.target
    }
    console.log(data)
    axios.post('http://localhost:3040/user/add-to-fiends', data)
      .then((answer) =>{
        console.log(answer.data)
        props.updateUserFriends(answer.data)})
      .catch(console.log)
  }

  const catchClick = (e) => {
    switch(e.target.className){
      case "modal-wrapper":
        props.closeModal()
        break
      case "modal__item_add":
        addUserToFriends()
        props.closeModal()
        break
      case "modal__item_privat":
        console.log("private")
        break
      default : console.log("enother")
    }
  }
  return(
    <div
      hidden={!props.chat.isOpened}
      className="modal-wrapper"
      onClick={catchClick}
    >
      <div
        className="modal"
        style={{ "position": "absolute","top": `${props.chat.top}px`,"left" :`${props.chat.left}px`}}
      >
        <ul className="modal__menu">
          <li className="modal__item_add">Add to friends</li>
          <li className="modal__item_privat">get private chat</li>
        </ul>
      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  closeModal: () => chatActions.closeModal(),
    updateUser: user => userActions.updateUser(user),
    updateUserFriends: friends => userActions.updateUserFriends(friends)
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalWindow);
