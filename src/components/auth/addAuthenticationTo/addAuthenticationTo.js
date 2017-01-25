import React, {Component} from "react";
import Spinner from "../../spinner/Spinner";
import AuthPage from "../authPage/AuthPage";

const addAuthenticationTo = WrappedComponent => {
	class AuthenticatedComponent extends Component {
		renderSpinner() {
			return (
				<main>
					<Spinner/>
				</main>
			);
		}

		renderWrappedComponent(isLoggedIn, props) {
			return isLoggedIn
				? <WrappedComponent {...props}/>
				: <AuthPage/>
		}

		render() {
			const {rehydrated, isLoggedIn, ...props} = this.props;

			return rehydrated
				? this.renderWrappedComponent(isLoggedIn, props)
				: this.renderSpinner()
		}
	}

	AuthenticatedComponent.propTypes = {
		isLoggedIn: React.PropTypes.bool.isRequired,
		rehydrated: React.PropTypes.bool.isRequired
	};

	return AuthenticatedComponent;
};

export default addAuthenticationTo;