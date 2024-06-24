import React from "react";
import "./NotFoundpage.css";
import notfoundImage from "../../images/404image.png";
import { useNavigate } from "react-router-dom";

const NotFoundpage = () => {
	const navigate = useNavigate();

	// to handle redirection to homepage
	const handleClick = (e) => {
		e.preventDefault();
		navigate("/home");
	};

	return (
		<div className="notfound">
			<div className="container notfound--container">
				{/* Not Found Text */}
				<div className="notfound--text">
					<h1 className="notfound--text--heading">Ooops! 404</h1>
					<p className="notfound--text--subheading">
						Sorry! Looks like this page does not exist or was moved.
					</p>
					<button
						className="primary-btn notfound--text--btn"
						onClick={handleClick}
					>
						Back to Homepage
					</button>
				</div>
				{/* Not Found Image */}
				<div className="notfound--image">
					<img src={notfoundImage} alt="404 Not Found" />
				</div>
			</div>
		</div>
	);
};

export default NotFoundpage;
