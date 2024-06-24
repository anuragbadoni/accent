import React from "react";
import "./Comment.css";
import userImagePlaceholder from "../../images/user image placeholder.jpg";
import { Link } from "react-router-dom";

const Comment = ({ data }) => {
	// To store the user details
	const postUser = data.user;
	// console.log(data);

	return (
		<div className="comment">
			<div className="comment--container">
				<Link to={`/profile/${postUser._id}`} className="comment--user--photo">
					<img
						src={
							postUser.profilePhoto
								? postUser.profilePhoto
								: userImagePlaceholder
						}
						alt=""
					/>
				</Link>
				<div className="comment--user--info">
					<Link
						to={`/profile/${postUser._id}`}
						className="comment--user--username"
					>
						{postUser.username}
					</Link>
					<p className="comment--user--text">{data.text}</p>
				</div>
			</div>
		</div>
	);
};

export default Comment;
