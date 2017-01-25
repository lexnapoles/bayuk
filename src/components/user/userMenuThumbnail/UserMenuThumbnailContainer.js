import {connect} from "react-redux";
import UserMenuThumbnail from "./UserMenuThumbnail";
import {getCurrentUser, isUserLoggedIn} from "../../../reducers/root";
import {getImagePath} from "../../../../utils/utils";

const mapStateToProps = state => {
	let image = void 0,
			name  = void 0;

	const isLoggedIn = isUserLoggedIn(state);

	if (isLoggedIn) {
		const {name: userName, image: userImage} = getCurrentUser(state);

		image = getImagePath("user", userImage);
		name = userName;
	}

	return {
		isLoggedIn,
		image: getImagePath("user", image),
		name
	}
};

export default connect(mapStateToProps)(UserMenuThumbnail);
