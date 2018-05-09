import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import './FriendsFrame.css';

const FriendsFrame = (props) => {
  const getFrienList = () => {
    if (!props.user.friends || props.user.friends.length === 0) {
      return (
        <li className="friends-frame__without-friends">Add at least one friend</li>
      );
    }
    return (
      props.friends.map(friend => (
        <li className="friends-frame__friend">{friend.name}</li>
      ))
    );
  };

  const friendsList = getFrienList();

  return (
    <asside className="friends-frame">
      <ul className="friends-frame__friends-list">
        { friendsList }
      </ul>
    </asside>
  );
};

FriendsFrame.propTypes = {
  friends: PropTypes.array,
};


const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  null,
)(FriendsFrame);
