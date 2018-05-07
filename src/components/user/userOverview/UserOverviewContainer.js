import PropTypes from "prop-types";
import React, { Component } from "react";
import { omit } from "lodash/object";
import { connect } from "react-redux";
import UserOverview from "./UserOverview";
import { getUserById } from "../../../reducers/root";
import loadUser from "../../../actions/users";

const loadData = ({ loadUser: load, id }) => load(id);

class UserOverviewContainer extends Component {
  componentWillMount() {
    loadData(this.props);
  }

  render() {
    const props = omit(this.props, ["loadUser", "id"]);

    return <UserOverview {...props} />;
  }
}

UserOverviewContainer.propTypes = {
  id: PropTypes.string.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, { id }) => {
  const user = getUserById(state, id);

  return {
    id,
    user
  };
};

export default connect(mapStateToProps, {
  loadUser
})(UserOverviewContainer);
