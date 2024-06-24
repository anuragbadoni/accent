import React from "react";
import "./FollowingsCardProfile.css";
import userImagePlaceholder from "../../images/user image placeholder.jpg";
import { useNavigate } from "react-router-dom";

const FollowingsCardProfile = ({ userData }) => {
	const navigate = useNavigate();

	const user = userData;

	// Function to redirect to user page
	const handleClick = () => {
		navigate(`/profile/${user._id}`);
	};

	return (
		<div className="followingsCard__profile" onClick={handleClick}>
			<div className="followingsCard__profile--image">
				<img
					src={user.profilePhoto ? user.profilePhoto : userImagePlaceholder}
					alt="profileimage"
				/>
			</div>
			<p className="followingsCard__profile--name">{user.username}</p>
		</div>
	);
};

export default FollowingsCardProfile;
