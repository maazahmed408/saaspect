import React, { useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../utils/auth";
import { toast } from "react-toastify";

const UpdateDetails = () => {
	const url = "https://api.saaspect.com/user/updateDetails";

	const [details, setDetails] = useState({
		address: "",
		hobbies: [],
		skills: [],
	});

	const jwt = isAuthenticated();
	const token = jwt["x-auth-token"];

	const updateDetails = (details) => {
		return fetch(url, {
			method: "PATCH",
			headers: {
				"x-auth-token": token,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ details }),
		})
			.then((res) => {
				return res.json();
			})
			.catch((err) => alert(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		updateDetails(details)
			.then((data) => {
				return toast.success(data);
			})
			.catch((err) => toast.error(err));
	};

	return (
		<Container>
			<Main>
				<Form>
					<h1>Update Your Details</h1>
					<FormGroup>
						<Label>Address</Label>
						<Input
							onChange={(e) =>
								setDetails({ ...details, address: e.target.value })
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Hobbies</Label>
						<Input
							onChange={(e) =>
								setDetails({ ...details, hobbies: [e.target.value] })
							}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Skills</Label>
						<Input
							onChange={(e) =>
								setDetails({ ...details, skills: [e.target.value] })
							}
						/>
					</FormGroup>
					<Button onClick={handleSubmit}>Submit</Button>
				</Form>
			</Main>
		</Container>
	);
};

export default UpdateDetails;

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
