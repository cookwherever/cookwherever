import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";

import { PageLayout } from "../PageLayout";
import login from "@wasp/auth/login";
import { errorMessage } from "@wasp/utils";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { LabelSmall } from "baseui/typography";

const LoginForm = () => {
	const history = useHistory();

	const [usernameFieldVal, setUsernameFieldVal] = useState("");
	const [passwordFieldVal, setPasswordFieldVal] = useState("");

	const handleLogin = async (event: any) => {
		event.preventDefault();
		try {
			await login(usernameFieldVal, passwordFieldVal);
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
			<Button onClick={handleLogin}>Login</Button>
		</form>
	);
};

const LoginPage = () => {
	return (
		<>
			<LoginForm />
			<br />
			<span>
				I don't have an account yet (<Link to="/signup">go to signup</Link>).
			</span>
		</>
	);
};

export default () => (
	<PageLayout>
		<LoginPage />
	</PageLayout>
);
