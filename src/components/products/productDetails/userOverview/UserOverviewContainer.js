import {connect} from "react-redux";
import UserOverview from "./UserOverview";
import {getUserById} from "../../../../reducers/root";
import {getImagePath} from "../../../../../utils/utils";

const formatUser = user => ({
	...user,
	image: getImagePath("user", user.image)
});

const mapStateToProps = (state, {user}) => {
	const {isFetching, item} = getUserById(state, user);

	return isFetching
		? {isFetching, user: {}}
		: {isFetching, user: item ? formatUser(item) : {}};
};

export default connect(mapStateToProps)(UserOverview);