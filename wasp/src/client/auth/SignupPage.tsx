import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";

import { PageLayout } from "../PageLayout";
import login from "@wasp/auth/login";
import signup from "@wasp/auth/signup";
import { errorMessage } from "@wasp/utils";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { LabelSmall } from "baseui/typography";

const SignupForm = () => {
	const history = useHistory();

	const [usernameFieldVal, setUsernameFieldVal] = useState("");
	const [passwordFieldVal, setPasswordFieldVal] = useState("");

	const handleSignup = async (event: any) => {
		event.preventDefault();
		try {
			await signup({ username: usernameFieldVal, password: passwordFieldVal });
			await login(usernameFieldVal, passwordFieldVal);

			setUsernameFieldVal("");
			setPasswordFieldVal("");

			// Redirect to configured page, defaults to /.
			history.push("/");
		} catch (err) {
			console.log(err);
			window.alert(errorMessage(err));
		}
	};

	return (
		<form className='signup-form auth-form'>
			<LabelSmall>Username</LabelSmall>
			<FormControl>
				<Input
					type="text"
					value={usernameFieldVal}
					onChange={(e) => setUsernameFieldVal(e.target.value)}
				/>
			</FormControl>
			<LabelSmall>Password</LabelSmall>
			<FormControl>
				<Input
					type="password"
					value={passwordFieldVal}
					onChange={(e) => setPasswordFieldVal(e.target.value)}
				/>
			</FormControl>
			<Button onClick={handleSignup}>Signup</Button>
		</form>
	);
};

const SignupPage = () => {
	return (
		<>
			<SignupForm />
			<br />
			<span>
				I already have an account (<Link to="/login">go to login</Link>).
			</span>
		</>
	);
};

export default () => (
	<PageLayout>
		<SignupPage />
	</PageLayout>
);
