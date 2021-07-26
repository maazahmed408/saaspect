import React, { useEffect, useContext } from "react";
import MenuContext from "../context/MenuContext";

const User = () => {
	const { setMenu } = useContext(MenuContext);

	useEffect(() => {
		setMenu({
			register: false,
			details: false,
			signin: false,
			admin: false,
			client: false,
			user: true,
		});
	}, []);

	return (
		<div>
			<h1>Home Page ! Admin , client , User have access here</h1>
		</div>
	);
};

export default User;
