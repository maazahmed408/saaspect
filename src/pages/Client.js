import React, { useEffect, useContext } from "react";
import MenuContext from "../context/MenuContext";
import { isAuthenticated } from "../utils/auth";

const Client = () => {
	const { setMenu } = useContext(MenuContext);
	const { user } = isAuthenticated();

	useEffect(() => {
		setMenu({
			register: false,
			details: false,
			signin: false,
			admin: false,
			client: true,
			user: false,
		});
	}, []);
	if (user.role === "user") {
		return (
			<div>
				<h1>
					You are not Authorised !! Only Admins and Clients can have Access here
				</h1>
				<h2>
					Your Post Request does not contain role of client but get details
					contain so we can't select client in registrations
				</h2>
				<h3>
					"UserCred validation failed: role: `client` is not a valid enum value
					for path `role`."
				</h3>
			</div>
		);
	}

	return (
		<div>
			<h1>This is Client Area </h1>
		</div>
	);
};

export default Client;
