import React from "react";
import "./FollowingsCard.css";
import FollowingsCardProfile from "../FollowingsCardProfile/FollowingsCardProfile";
import { useState } from "react";
import { useEffect } from "react";
import { getUserFollowings } from "../../api/UserApi";

const FollowingsCard = ({ userId }) => {
	// to store the followings users data
	const [followings, setFollowings] = useState([]);
	// console.log(followings);

	useEffect(() => {
		const fetchUsers = async () => {
			const followingsData = await getUserFollowings(userId);
			setFollowings(followingsData.data);
		};
		fetchUsers();
	}, [userId]);

	if (followings.length === 0) {
		return (
			<div className="followingsCard__container">
				<h2 className="followingsCard__header">FOLLOWINGS</h2>
				<div className="followingsCard__list">
					<p>You are not following anyone.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="followingsCard__container">
			<h2 className="followingsCard__header">FOLLOWINGS</h2>
			<div className="followingsCard__list">
				{followings.map((user) => (
					<FollowingsCardProfile userData={user} key={user._id} />
				))}
			</div>
		</div>
	);
};

export default FollowingsCard;
