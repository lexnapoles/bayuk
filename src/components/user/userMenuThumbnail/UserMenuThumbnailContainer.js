import {connect} from "react-redux";
import UserMenuThumbnail from "./UserMenuThumbnail";
import {getCurrentUser, isUserLoggedIn} from "../../../reducers/root";
import {getImagePath} from "../../../utils";

const mapStateToProps = state => {
	let image = void 0,
			name  = "",
			id    = "";

	const isLoggedIn = isUserLoggedIn(state);

	if (isLoggedIn) {
		const {id: userId, name: userName, image: userImage} = getCurrentUser(state);

		image = userImage;
		name = userName;
		id = userId;
	}

	return {
		isLoggedIn,
		id,
		image: getImagePath("user", image),
		name
	}
};

export default connect(mapStateToProps)(UserMenuThumbnail);