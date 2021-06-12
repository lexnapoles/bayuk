import PropTypes from "prop-types";
import React, { Component } from "react";
import { omit } from "lodash/object";
import { connect } from "react-redux";
import { registerUser } from "../../actions/api";
import AuthFormContainer from "./authForm/AuthFormContainer";
import geolocated from "../geolocated/geolocated";
import { getGeolocation } from "../../reducers/root";

class Register extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formData) {
    const { latitude, longitude } = this.props;

    this.props.onSubmit({
      ...formData,
      latitude,
      longitude
    });
  }

  render() {
    const props = {
      ...omit(this.props, "onSubmit"),
      onSubmit: this.onSubmit
    };

    return (
      <AuthFormContainer formName="Create Account" logIn={false} {...props} />
    );
  }
}

const mapStateToProps = state => {
  const coords = getGeolocation(state);

  return {
    isAlreadyLocated: Boolean(coords),
    coords
  };
};

Register.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  onSubmit: registerUser
})(geolocated(Register));
