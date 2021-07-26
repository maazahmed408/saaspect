import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MenuContext from "../context/MenuContext";
import { signout, isAuthenticated } from "../utils/auth";

const Sidebar = () => {
	const { menu } = useContext(MenuContext);
	const jwt = isAuthenticated();
	const { user } = jwt;

	return (
		<Container>
			<Header>
				<h1>Saaspect</h1>
			</Header>
			<Menu>
				<Heading>Menu</Heading>
				<Content>
					<ul>
						{jwt ? (
							<>
								<Link to="/user">
									{menu.user ? <List>Home</List> : <li>Home</li>}
								</Link>
								<Link to="/details">
									{menu.details ? <List>Details</List> : <li>Details</li>}
								</Link>
								<Link to="/client">
									{menu.client ? (
										<List>Client Area</List>
									) : (
										<li>Client Area</li>
									)}
								</Link>
								<Link to="/admin">
									{menu.admin ? <List>Admin Panel</List> : <li>Admin Panel</li>}
								</Link>
								<Link to="/">
									<li onClick={() => signout()}>Logout</li>
								</Link>
							</>
						) : (
							<>
								<Link to="/">
									{menu.register ? <List>Register</List> : <li>Register</li>}
								</Link>
								<Link to="/signin">
									{menu.signin ? <List>Login</List> : <li>Login</li>}
								</Link>
							</>
						)}
					</ul>
				</Content>
			</Menu>
		</Container>
	);
};

export default Sidebar;

const Container = styled.div`
	background-color: #202729;
	width: 250px;
	height: 100vh;
	padding: 1em 2em;
	border-right: 1px solid #3b3b3b;
	ul {
		list-style-type: none;
		padding: 0;

		li {
			padding: 14px 0 14px 7px;
			border-radius: 5px;
			cursor: pointer;
			margin-bottom: 5px;
			color: white;
			:hover {
				color: #c9cfd9;
			}
		}
	}
`;
const Header = styled.div`
	h1 {
		font-size: 24px;
		background: -webkit-linear-gradient(#71d7a2, #a0ce8d);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	margin-bottom: 4rem;
`;
const Menu = styled.div``;

const Content = styled.div`
	ul {
		display: flex;
		flex-direction: column;
	}
`;

const List = styled.li`
	color: white;

	background: rgb(113, 215, 162);
	background: radial-gradient(
		circle,
		rgba(113, 215, 162, 1) 0%,
		rgba(160, 206, 141, 1) 100%
	);

	transition: all 0.5s ease;
`;

const Heading = styled.h2`
	color: #c9cfd9;
	font-size: 20px;
	font-weight: 300;
`;
