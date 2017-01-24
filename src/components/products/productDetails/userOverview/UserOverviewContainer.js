import {connect} from "react-redux";
import UserOverview from "./UserOverview";
import {getUserById} from "../../../../reducers/root";
import {getImagePath} from "../../../../../utils/utils";

const formatUser = user => ({
	...user,
	image: getImagePath("user", user.image)
});

const mapStateToProps = (state, {user}) => {
	const {item} = getUserById(state, user);

	return {
		user: formatUser(item)
	};
};

export default connect(mapStateToProps)(UserOverview);