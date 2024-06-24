import React from "react";
import "./Navbar.css";
import accentLogo from "../../images/accent text logo.png";
// import profileImg from "../../images/profile1.jpg";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import {
	// FaBookmark,
	FaSearch,
	FaUser,
	FaPlus,
	FaStar,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/AuthSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserImagePlaceholder from "../../images/user image placeholder.jpg";
import decode from "jwt-decode";
import { useEffect } from "react";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Getting the user info from the global state
	const user = useSelector((state) => state.auth.authData);

	// To store the dropdown state
	const [dropdown, setDropdown] = useState(false);

	// Function to toggle dropdown state
	const handleDropdown = () => {
		setDropdown((prev) => !prev);
	};

	// Function to Logout User
	const handleLogOut = () => {
		dispatch(logOut());
	};

	// Function to redirect to settings page
	const handleSettings = (e) => {
		e.preventDefault();
		navigate(`settings`);
	};

	// Function to direct to UploadPost page
	const handleNewPost = (e) => {
		e.preventDefault();
		navigate("../upload");
	};

	// To check for token and logout user if expired
	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				handleLogOut();
			}
		}
	});

	return (
		<nav className="navbar">
			<div className="container navbar__container">
				{/* Left Logo Section */}
				<Link to="/" className="navbar__logo">
					<img src={accentLogo} alt="accent-logo" />
				</Link>

				{/* Middle Navlinks Section. Renders only when user is logged in */}
				{user && (
					<div className="navbar__navlinks">
						<NavLink
							to="/home"
							className={({ isActive }) =>
								isActive
									? "navbar__navlink navbar__navlink--active"
									: "navbar__navlink"
							}
						>
							<AiFillHome size={28} />
							<span className="tooltipcard">
								<p className="tooltiptext">Home</p>
							</span>
						</NavLink>
						<NavLink
							to="/search"
							className={({ isActive }) =>
								isActive
									? "navbar__navlink navbar__navlink--active"
									: "navbar__navlink"
							}
						>
							<FaSearch />
							<span className="tooltipcard">
								<p className="tooltiptext">Search</p>
							</span>
						</NavLink>
						<NavLink
							to="/saved"
							className={({ isActive }) =>
								isActive
									? "navbar__navlink navbar__navlink--active"
									: "navbar__navlink"
							}
						>
							<FaStar size={26} />
							<span className="tooltipcard">
								<p className="tooltiptext">Saved</p>
							</span>
						</NavLink>

						{/* <Link to="/marketplace" className="navbar__navlink">
              <FaShoppingBag />
              <span className="tooltipcard">
                <p className="tooltiptext">Marketplace</p>
              </span>
            </Link> */}
						<NavLink
							to={`/profile/${user.user._id}`}
							className={({ isActive }) =>
								isActive
									? "navbar__navlink navbar__navlink--active"
									: "navbar__navlink"
							}
						>
							<FaUser />
							<span className="tooltipcard">
								<p className="tooltiptext">Profile</p>
							</span>
						</NavLink>
					</div>
				)}

				{/* Right Profile Section. Renders only when user if logged in */}
				{user && (
					<div className="navbar__profile">
						<div className="navbar__profile--icon" onClick={handleDropdown}>
							<img
								src={
									user.user.profilePhoto
										? user.user.profilePhoto
										: UserImagePlaceholder
								}
								alt="profile"
							/>
							{dropdown && (
								<div className="navbar__profile--dropdown">
									<button
										className="navbar__profile--option"
										onClick={handleSettings}
									>
										<AiFillSetting /> Settings
									</button>
									<button
										className="navbar__profile--option"
										onClick={handleLogOut}
									>
										<MdLogout size={18} /> Logout
									</button>
								</div>
							)}
						</div>
						<button
							className="primary-btn navbar__uploadbtn"
							onClick={handleNewPost}
						>
							<FaPlus /> Upload
						</button>
						<button
							className="primary-btn navbar__uploadbtn--mobile"
							onClick={handleNewPost}
						>
							<FaPlus />
						</button>
					</div>
				)}
			</div>
			{user && (
				<div className="navbar__navlinks--mobile">
					<NavLink
						to="/home"
						className={({ isActive }) =>
							isActive
								? "navbar__navlink navbar__navlink--active"
								: "navbar__navlink"
						}
					>
						<AiFillHome size={28} />
					</NavLink>
					<NavLink
						to="/search"
						className={({ isActive }) =>
							isActive
								? "navbar__navlink navbar__navlink--active"
								: "navbar__navlink"
						}
					>
						<FaSearch />
					</NavLink>
					<NavLink
						to="/saved"
						className={({ isActive }) =>
							isActive
								? "navbar__navlink navbar__navlink--active"
								: "navbar__navlink"
						}
					>
						<FaStar size={26} />
					</NavLink>

					{/* <Link to="/marketplace" className="navbar__navlink">
              <FaShoppingBag />
              <span className="tooltipcard">
                <p className="tooltiptext">Marketplace</p>
              </span>
            </Link> */}
					<NavLink
						to={`/profile/${user.user._id}`}
						className={({ isActive }) =>
							isActive
								? "navbar__navlink navbar__navlink--active"
								: "navbar__navlink"
						}
					>
						<FaUser />
					</NavLink>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
