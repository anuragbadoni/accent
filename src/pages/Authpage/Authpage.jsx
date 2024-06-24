import React, { useState } from "react";
import "./Authpage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

const Authpage = () => {
	// stores the initial form data
	const initialData = {
		firstname: "",
		lastname: "",
		email: "",
		username: "",
		password: "",
		confirmpassword: "",
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get the authentication Loading State from redux
	const loading = useSelector((state) => state.auth.loading);

	// Get the error state from redux
	const error = useSelector((state) => state.auth.error);

	// Get error message from redux
	const errorMessage = useSelector((state) => state.auth.errorMessage);

	//state to determine whether to show password
	const [showpass, setShowpass] = useState(false);

	// state to determine whether to show signup form for signin form
	const [isSignup, setIsSignup] = useState(false);

	// state to store the form data
	const [data, setData] = useState(initialData);

	// state to store password and confirm password validity
	const [confirmPassword, setConfirmPassword] = useState(true);

	// state to store the slow server announcement
	const [announcement, setAnnouncement] = useState(false);

	//function to toggle show password state
	const toggleShowPassword = () => {
		setShowpass((prev) => !prev);
	};

	// function to handle input change
	const handleInputChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	// function to reset input values on submit or form switch
	const resetFormInput = () => {
		setConfirmPassword(true);
		setData(initialData);
	};

	// function to toggle the signup state
	const handleSignupToggle = () => {
		setIsSignup((prev) => !prev);
		resetFormInput();
	};

	//function to handle form submission
	const handleFormSubmit = (e) => {
		e.preventDefault();
		setAnnouncement(true);
		if (isSignup) {
			if (data.password === data.confirmpassword) {
				dispatch(signUp(data))
					.unwrap()
					.then(() =>
						dispatch(logIn(data))
							.unwrap()
							.then(() => navigate("../home", { replace: true }))
					);
			} else {
				setConfirmPassword(false);
			}
		} else {
			dispatch(logIn(data))
				.unwrap()
				.then(() => navigate("../home", { replace: true }));
		}
	};

	return (
		<div className="authpage">
			<div className="container authpage--container">
				{/* Header */}
				<div className="auth--header">
					<p className="auth--subheading">
						{isSignup ? "It's free!" : "Welcome back!"}
					</p>
					<h1 className="auth--heading">
						{isSignup ? "Create a new account" : "Sign in to your account"}
					</h1>
					<p className="auth--method">
						{isSignup ? "Already got an account?" : "New here?"}{" "}
						<button className="auth--method--btn" onClick={handleSignupToggle}>
							{isSignup ? "Log in here" : "Create account here"}
						</button>
					</p>
				</div>
				{/* Error Message */}
				{error && <span className="auth--error">⚠️ {errorMessage}</span>}
				{/* Form */}
				<form className="auth--form--container" onSubmit={handleFormSubmit}>
					{isSignup && (
						<div className="auth--form--input">
							<input
								type="text"
								placeholder="First name"
								name="firstname"
								onChange={handleInputChange}
								value={data.firstname}
							/>
						</div>
					)}
					{isSignup && (
						<div className="auth--form--input">
							<input
								type="text"
								placeholder="Last name"
								name="lastname"
								onChange={handleInputChange}
								value={data.lastname}
							/>
						</div>
					)}
					<div className="auth--form--input">
						<input
							type="text"
							placeholder="Username"
							name="username"
							maxLength="20"
							onChange={handleInputChange}
							value={data.username}
						/>
					</div>
					{isSignup && (
						<div className="auth--form--input">
							<input
								type="text"
								placeholder="Email address"
								name="email"
								onChange={handleInputChange}
								value={data.email}
							/>
						</div>
					)}
					<div className="auth--form--input">
						<input
							type={showpass ? "text" : "password"}
							placeholder="Password"
							name="password"
							onChange={handleInputChange}
							value={data.password}
						/>
						<div
							className="auth--form--input--btn"
							onClick={toggleShowPassword}
						>
							{showpass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
						</div>
					</div>
					{isSignup && (
						<div className="auth--form--input">
							<input
								type={showpass ? "text" : "password"}
								placeholder="Confirm Password"
								name="confirmpassword"
								onChange={handleInputChange}
							/>
							<div
								className="auth--form--input--btn"
								onClick={toggleShowPassword}
							>
								{showpass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
							</div>
						</div>
					)}
					{!confirmPassword && isSignup && (
						<span className="auth--error">
							⚠️ Passwords do not match! Please check and try again.
						</span>
					)}
					{/* Button */}
					<button
						className="primary-btn auth--submit--btn"
						type="submit"
						disabled={loading}
					>
						{loading
							? "Submitting..."
							: isSignup
							? "Create account"
							: "Sign In"}
					</button>
				</form>
				{/* Annoucement */}
				{announcement && (
					<p className="auth--annoucement">
						⚠️ Since this project is hosted on a free server, it may take upto
						30 seconds to load. Please refresh if it is taking too long.
					</p>
				)}
			</div>
		</div>
	);
};

export default Authpage;
