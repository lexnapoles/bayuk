import React, {Component} from "react";
import {browserHistory} from "react-router";
import Spinner from "../../spinner/Spinner";
import {authContainer, auth, message, buttonsContainer, button} from "./addAuthenticationTo.css";

const addAuthenticationTo = (register, login) => WrappedComponent => {
	class AuthenticatedComponent extends Component {
		renderAuthenticationMessage() {
			const goToRegister = () => browserHistory.push(register),
						goToLogIn    = () => browserHistory.push(login);

			return (
				<main className={authContainer}>
					<div className={auth}>
						<div className={message}>
							<h1>Hello!</h1>
							<h2>Register to enjoy all the possibilities</h2>
						</div>
						<div className={buttonsContainer}>
							<button className={button} onClick={goToLogIn}>I have an account</button>
							<button className={button} onClick={goToRegister}>I'm a new user</button>
						</div>
					</div>
				</main>
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

export default addAuthenticationTo("/register", "/login");