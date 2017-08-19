import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserMenuThumbnail from './UserMenuThumbnail';
import { getCurrentUser, getUserById, isUserLoggedIn } from '../../../reducers/root';
import loadCurrentUser from '../../../actions/currentUser';

const loadData = ({ loadCurrentUser: load }) => load();

class UserMenuThumbnailContainer extends Component {
  componentWillReceiveProps(props) {
    loadData(props);
  }

  render() {
    const { user } = this.props;

    return <UserMenuThumbnail user={user} />;
  }
}

UserMenuThumbnailContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
};

UserMenuThumbnailContainer.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => {
  const { id } = isUserLoggedIn(state) ? getCurrentUser(state) : {};
  const user = getUserById(state, id);

  return {
    user,
    id,
  };
};

export default connect(mapStateToProps, {
  loadCurrentUser,
})(UserMenuThumbnailContainer);
