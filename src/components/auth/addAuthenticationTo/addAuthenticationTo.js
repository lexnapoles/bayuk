import PropTypes from 'prop-types';
import {isNotEmpty} from "../../../utils";
import React, {Component} from "react";
import Spinner from "../../spinner/Spinner";
import AuthPage from "../authPage/AuthPage";
import {alignCenter} from "./addAuthenticationTo.css";

const addAuthenticationTo = WrappedComponent => {
	class AuthenticatedComponent extends Component {
		renderSpinner() {
			return (
				<main className={alignCenter}>
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
			const {user, isLoggedIn, ...props} = this.props;

			return isNotEmpty(user)
				? this.renderWrappedComponent(isLoggedIn, props)
				: this.renderSpinner()
		}
	}

	AuthenticatedComponent.propTypes = {
		isLoggedIn: PropTypes.bool.isRequired,
		user:       PropTypes.object.isRequired
	};

	return AuthenticatedComponent;
};

export default addAuthenticationTo;