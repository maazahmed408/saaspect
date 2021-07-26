import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Login, authenticate } from "../utils/auth";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import MenuContext from "../context/MenuContext";

const Signin = () => {
	const { setMenu } = useContext(MenuContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		Login({ email, password }).then((data) => {
			authenticate(data);
			setRedirect(true);
		});
	};

	const doRedirect = () => {
		if (redirect) {
			return <Redirect to="/details" />;
		}
	};

	useEffect(() => {
		setMenu({
			register: false,
			details: false,
			signin: true,
			admin: false,
			client: false,
			user: false,
		});
	}, []);

	return (
		<Container>
			<Main>
				<Form>
					<h1>Login</h1>
					<FormGroup>
						<Label>email</Label>
						<Input
							placeholder="please enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Input
							type="password"
							placeholder="please enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormGroup>

					<Button onClick={handleSubmit}>Submit</Button>
				</Form>
			</Main>
			{doRedirect()}
		</Container>
	);
};

export default Signin;

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: #202729;
	text-align: center;

	h1 {
		background: -webkit-linear-gradient(#71d7a2, #a0ce8d);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-bottom: 3rem;
	}
`;

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	background-color: #232a2c;
	padding: 2rem 5rem;
	border-radius: 10px;
`;

const FormGroup = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
`;

const Label = styled.label`
	color: #c9cfd9;
	margin-right: 2rem;
`;

const Input = styled.input`
	caret-color: white;
	background: -webkit-linear-gradient(#71d7a2, #a0ce8d);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	outline: 0;
	border: 1px solid #c9cfd9;
	padding: 1rem;
	border-radius: 10px;
`;

const Button = styled.button`
	margin-top: 1rem;
	padding: 1rem;
	border-radius: 15px;
	border: 0;
	background-color: #fe9e7a;
	font-size: 1rem;
	font-weight: 700;
	color: #3b3b3b;
	cursor: pointer;

	:hover {
		background-color: #fe885c;
	}
`;
