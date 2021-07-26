import "./App.css";
import Sidebar from "./layout/Sidebar";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import page404 from "./pages/page404";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Details from "./pages/Details";
import MenuContext from "./context/MenuContext";
import { useState } from "react";
import UpdateDetails from "./components/UpdateDetails";
import Admin from "./pages/Admin";
import User from "./pages/User";
import Client from "./pages/Client";

function App() {
	const [menu, setMenu] = useState({
		register: true,
		signin: false,
		details: false,
		user: false,
		admin: false,
		client: false,
	});

	return (
		<MenuContext.Provider value={{ menu, setMenu }}>
			<Router>
				<Container>
					<ToastContainer />
					<Sidebar />
					<Switch>
						<Route exact path="/" component={Register} />
						<Route path="/signin" component={Signin} />
						<Route path="/details" component={Details} />
						<Route path="/updatedetails" component={UpdateDetails} />
						<Route path="/admin" component={Admin} />
						<Route path="/user" component={User} />
						<Route path="/client" component={Client} />
						<Route component={page404} />
					</Switch>
				</Container>
			</Router>
		</MenuContext.Provider>
	);
}

export default App;

const Container = styled.div`
	display: flex;
`;
