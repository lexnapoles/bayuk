import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import UserMenuThumbnail from "./UserMenuThumbnail";
import {getCurrentUser, getUserById, isUserLoggedIn} from "../../../reducers/root";
import {loadUser} from "../../../actions/users";

const loadData = ({isLoggedIn, loadUser, id}) => {
	if (isLoggedIn) {
		loadUser(id);
	}
};

class UserMenuThumbnailContainer extends Component {
	componentWillReceiveProps(props) {
		loadData(props);
	}

	render() {
		const {user} = this.props;

		return <UserMenuThumbnail user={user}/>
	}
}

UserMenuThumbnailContainer.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	user:       PropTypes.object,
	id:         PropTypes.string
};


const mapStateToProps = state => {
	const isLoggedIn = isUserLoggedIn(state),
				{id}       = isLoggedIn ? getCurrentUser(state) : {},
				user       = getUserById(state, id) || {};

	return {
		isLoggedIn,
		user,
		id
	}
};

export default connect(mapStateToProps, {
	loadUser
})(UserMenuThumbnailContainer);