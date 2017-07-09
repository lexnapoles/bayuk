import PropTypes from 'prop-types';
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
			const {isLoggedIn, ...props} = this.props;

			return this.renderWrappedComponent(isLoggedIn, props);
		}
	}

	AuthenticatedComponent.propTypes = {
		isLoggedIn: PropTypes.bool.isRequired
	};

	return AuthenticatedComponent;
};

export default addAuthenticationTo;