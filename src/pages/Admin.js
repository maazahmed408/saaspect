import React, { useEffect, useContext } from "react";
import MenuContext from "../context/MenuContext";
import { isAuthenticated } from "../utils/auth";

const Admin = () => {
	const { setMenu } = useContext(MenuContext);
	const { user } = isAuthenticated();

	useEffect(() => {
		setMenu({
			register: false,
			details: false,
			signin: false,
			admin: true,
			client: false,
			user: false,
		});
	}, []);

	if (user.role !== "admin") {
		return (
			<div>
				<h1>You are not Authorised !! Only Admins can have Access here</h1>
			</div>
		);
	}

	return (
		<div>
			<h1>This is Admin Panel </h1>
		</div>
	);
};

export default Admin;
