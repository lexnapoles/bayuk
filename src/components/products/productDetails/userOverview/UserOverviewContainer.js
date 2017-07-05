import PropTypes from 'prop-types';
import React, { Component } from "react";
import {omit} from "lodash/object";
import {connect} from "react-redux";
import UserOverview from "./UserOverview";
import {getUserById} from "../../../../reducers/root";
import {getImagePath} from "../../../../utils";
import {loadUser} from "../../../../actions/users";

const loadData = ({loadUser, id}) => loadUser(id);

class UserOverviewContainer extends Component {
	componentWillMount() {
		loadData(this.props);
	}

	render() {
		const props = omit(this.props, "loadUser");

		return <UserOverview {...props}/>
	}
}

UserOverviewContainer.propTypes = {
	id:       PropTypes.string.isRequired,
	loadUser: PropTypes.func.isRequired
};


const formatUser = user => ({
	...user,
	image: getImagePath("user", user.image)
});

const mapStateToProps = (state, {id}) => {
	const {isFetching, item} = getUserById(state, id);

	return isFetching
		? {isFetching, id, user: {}}
		: {isFetching, id, user: item ? formatUser(item) : {}};
};

export default connect(mapStateToProps, {
	loadUser
})(UserOverviewContainer);
