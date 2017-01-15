import React, {Component} from "react";
import Spinner from "../../spinner/Spinner";

const addAuthenticationTo = WrappedComponent => {
	class AuthenticatedComponent extends Component {
		renderAuthenticationMessage() {
			return (
				<div>
					<h1>Hello! It seems you're not logged in</h1>
					<button>I have an account</button>
					<button>I'm a new user</button>
				</div>
			);
		}

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
				: this.renderAuthenticationMessage()
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