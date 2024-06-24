import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import Searchpage from "./pages/Searchpage/Searchpage";
import Profilepage from "./pages/Profilepage/Profilepage";
import Authpage from "./pages/Authpage/Authpage";
import { useSelector } from "react-redux";
import Uploadpage from "./pages/Uploadpage/Uploadpage";
import Savedpage from "./pages/Savedpage/Savedpage";
import Postpage from "./pages/Postpage/Postpage";
import NotFoundpage from "./pages/NotFoundpage/NotFoundpage";
import Settingspage from "./pages/Settingspage/Settingspage";
import Donationpage from "./pages/Donationpage/Donationpage";

function App() {
	const user = useSelector((state) => state.auth.authData);
	// const user = JSON.parse(localStorage.getItem("profile"));

	/* Navbar is displayed on every page. Auth page will be displayed only if user is NOT logged in or they will be redirected to the home page. All other pages will be displayed if user IS logged in. Else, they will be redirected to the Auth page. */

	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
				/>
				<Route
					path="/home"
					element={user ? <Homepage /> : <Navigate to="../auth" />}
				/>
				<Route
					path="/auth"
					element={user ? <Navigate to="../home" /> : <Authpage />}
				/>
				<Route
					path="/search"
					element={user ? <Searchpage /> : <Navigate to="../auth" />}
				/>
				<Route
					path="/saved"
					element={user ? <Savedpage /> : <Navigate to="../auth" />}
				/>
				<Route
					path="/profile/:id"
					element={user ? <Profilepage /> : <Navigate to="../auth" />}
				/>
				<Route
					path="/post/:id"
					element={user ? <Postpage /> : <Navigate to="../auth" />}
				/>
				<Route
					path="/upload"
					element={user ? <Uploadpage /> : <Navigate to="../auth" />}
				/>
				<Route
					path="/settings"
					element={user ? <Settingspage /> : <Navigate to="../auth" />}
				/>
				<Route
					path="/donation"
					element={user ? <Donationpage /> : <Navigate to="../auth" />}
				/>
				<Route path="*" element={<NotFoundpage />} />
			</Routes>
		</div>
	);
}

export default App;
