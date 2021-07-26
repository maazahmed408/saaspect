import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const Signup = (user) => {
	const url = "https://api.saaspect.com/user/register";

	return fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then(async (response) => {
			const data = await response.json();
			if (response.status == 200) {
				toast.success(data);
				return;
			} else {
				console.log(data);
				toast.error(data);
			}
		})
		.catch((err) => alert(err));
};

export const Login = (user) => {
	const url = "https://api.saaspect.com/user/login";

	return fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then(async (response) => {
			const data = await response.json();
			if (response.status === 200) {
				toast.success("User Signed In Successfully");
				console.log(data);
				return data;
			} else {
				toast.error(data);
				return data;
			}
		})
		.catch((err) => alert(err));
};

export const authenticate = (data) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data));
	}
};

export const signout = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
	}
};

export const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false;
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};
