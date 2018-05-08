import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../store/redux/chat/actions';

import './ModalWindow.css'

const ModalWindow = (props) => {

  const catchClick = (e) => {
    switch(e.target.className){
      case "modal-wrapper":
        props.closeModal()
        break
      case "modal__item_add":
        console.log("add")
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  closeModal: () => actions.closeModal()
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalWindow);
