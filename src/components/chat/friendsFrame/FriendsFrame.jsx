import React from 'react';
import PropTypes from 'prop-types';

import './FriendsFrame.css'

const FriendsFrame = (props) => {
  const getFrienList = () => {
    if(!props.friends || props.friends.length === 0){
      return(
        <li className="friends-frame__without-friends">Add at least one friend</li>
      )
    }else{
      return(
        props.friends.map(friend => (
          <li className="friends-frame__friend">{friend.name}</li>
        ))
      )
    }
  }

  const friendsList = getFrienList();

  return(
    <asside className="friends-frame">
      <ul className="friends-frame__friends-list">
        { friendsList }
      </ul>
    </asside>
  )
}

FriendsFrame.propTypes ={
  friends: PropTypes.array,
}

export default FriendsFrame
