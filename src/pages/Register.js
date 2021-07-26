import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Signup } from "../utils/auth";
import MenuContext from "../context/MenuContext";
import { Redirect } from "react-router-dom";
var validator = require("email-validator");

const Register = () => {
	const { setMenu } = useContext(MenuContext);

	const [roles, setRoles] = useState([]);
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		number: "",
		role: "",
	});
	const [redirect, setRedirect] = useState(false);

	const { name, email, password, number, role } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const doRedirect = () => {
		if (redirect) {
			return <Redirect to="/signin" />;
		}
	};

	const getRole = async () => {
		const response = await fetch("https://api.saaspect.com/user/roles");
		const data = await response.json();
		setRoles(data);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (validator.validate(email)) {
			Signup({ name, email, password, number, role })
				.then((data) => setRedirect(true))
				.catch((err) => alert(err));
		} else {
			toast.error("Invalid email");
			setRedirect(false);
		}
	};

	useEffect(() => {
		getRole();
		setMenu({
			register: true,
			details: false,
			signin: false,
			admin: false,
			client: false,
			user: false,
		});
	}, []);

	return (
		<Container>
			<Main>
				<Form>
					<h1>Registration</h1>
					<FormGroup>
						<Label>Name</Label>
						<Input
							placeholder="please enter your name"
							onChange={handleChange("name")}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input
							placeholder="please enter your email"
							onChange={handleChange("email")}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Input
							type="password"
							placeholder="please enter your password"
							onChange={handleChange("password")}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Number</Label>
						<Input
							placeholder="please enter your number"
							onChange={handleChange("number")}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Role</Label>
						<Select onChange={handleChange("role")}>
							<option>select</option>
							{roles.map((role) => (
								<option key={role}>{role}</option>
							))}
						</Select>
					</FormGroup>
					<Button onClick={onSubmit}>Submit</Button>
				</Form>
				{doRedirect()}
			</Main>
		</Container>
	);
};

export default Register;

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

const Select = styled.select`
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
