import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../utils/auth";
import MenuContext from "../context/MenuContext";
import { Link } from "react-router-dom";

const Details = () => {
	const { setMenu } = useContext(MenuContext);
	const url = "https://api.saaspect.com/user/fetchDetails";

	const [user, setUser] = useState({
		name: "",
		role: "",
		address: "",
		email: "",
		hobbies: [],
		skills: [],
	});

	const jwt = isAuthenticated();
	const token = jwt["x-auth-token"];

	const getDetails = async () => {
		const response = await fetch(url, {
			headers: {
				"x-auth-token": token,
			},
		});
		const data = await response.json();
		setUser({
			...user,
			name: data.details.name,
			email: data.details.email,
			role: data.details.role,
			hobbies: data.details.hobbies,
			skills: data.details.skills,
			address: data.details.address,
		});
	};

	useEffect(() => {
		setMenu({
			register: false,
			details: true,
			signin: false,
			admin: false,
			client: false,
			user: false,
		});
		getDetails();
	}, []);

	return (
		<Container>
			<Main>
				<Form>
					<h1>Details</h1>
					<FormGroup>
						<Label>Name</Label>
						<Input value={user.name} readOnly />
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input value={user.email} readOnly />
					</FormGroup>
					<FormGroup>
						<Label>Address</Label>
						<Input value={user.address} readOnly />
					</FormGroup>
					<FormGroup>
						<Label>Hobbies</Label>
						<Input value={user.hobbies.toLocaleString()} readOnly />
					</FormGroup>
					<FormGroup>
						<Label>Skills</Label>
						<Input value={user.skills.toLocaleString()} readOnly />
					</FormGroup>
					<FormGroup>
						<Label>Role</Label>
						<Input value={user.role} readOnly />
					</FormGroup>
					<Link to="/updatedetails">
						<Button>Go To Update Page</Button>
					</Link>
				</Form>
			</Main>
		</Container>
	);
};

export default Details;

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
	justify-content: flex-end;
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
const SmallButton = styled.button`
	margin-left: 2rem;
	padding: 0.8rem;
	border-radius: 5px;
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
