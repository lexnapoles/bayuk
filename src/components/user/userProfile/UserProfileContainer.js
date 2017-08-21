import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import loadUser from '../../../actions/users';
import { getUserById } from '../../../reducers/root';
import Spinner from '../../spinner/Spinner';

const loadData = ({ id, loadUser: load }) => load(id);

class UserProfileContainer extends Component {
  componentWillMount() {
    loadData(this.props);
  }

  render() {
    const { user } = this.props;

    return user
      ? <UserProfile user={user} />
      : <Spinner />;
  }
}

UserProfileContainer.propTypes = {
  user: PropTypes.shape({}),
};

UserProfileContainer.defaultProps = {
  user: null,
};

const mapStateToProps = (state, { params: { id } }) => ({
  user: getUserById(state, id),
  id,
});

export default connect(mapStateToProps, {
  loadUser,
})(UserProfileContainer);

