import React from "react";
import "./Postpage.css";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaHeart, FaStar } from "react-icons/fa";
import { FaPlus, FaCheck } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import userImagePlaceholder from "../../images/user image placeholder.jpg";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getPostComments, likePost } from "../../api/PostApi";
import {
	followUser,
	savePost,
	unfollowUser,
	unsavePost,
} from "../../redux/AuthSlice";
import Comment from "../../components/Comment/Comment";
import { commentPost } from "../../redux/PostSlice";
import DonateModal from "../../components/DonateModal/DonateModal";
import Loader from "../../components/Loader/Loader";

const Postpage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Get current user from the store
	const currentUser = useSelector((state) => state.auth.authData.user);

	// Get the post id from the params
	const { id } = useParams();

	// To store the post details
	const [postDetails, setPostDetails] = useState({
		title: "",
		desc: "",
		likes: [],
		comments: [],
	});

	// To store the user details
	const [postUser, setPostUser] = useState({
		username: "",
		followers: [],
		following: [],
	});

	// To store the post comments
	const [postComments, setPostComments] = useState([]);

	// To store the liked stated of the post
	const [liked, setLiked] = useState(
		postDetails.likes.includes(currentUser._id)
	);

	// To store the likes count of the post
	const [likes, setLikes] = useState(postDetails.likes.length);

	// To store the saved post state
	const [saved, setSaved] = useState(currentUser.savedPosts.includes(id));

	// To store the followed state
	const [followed, setFollowed] = useState(
		currentUser.following.includes(postUser._id)
	);

	// To store the comment state
	const [comment, setComment] = useState("");
	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	// To store the donate modal state
	const [donateModal, setDonateModal] = useState(false);

	// Set the post and user details as soon as the page loads
	useEffect(() => {
		const fetchDetails = async () => {
			const postData = await getPost(id);
			const postComments = await getPostComments(id);
			setPostDetails(postData.data);
			setPostUser(postData.data.userId);
			setPostComments(postComments.data);
			setLiked(postData.data.likes.includes(currentUser._id));
			setLikes(postData.data.likes.length);
			setFollowed(currentUser.following.includes(postData.data.userId));
		};
		fetchDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	// Function to toggle donate modal
	const toggleDonateModal = () => {
		setDonateModal((prev) => !prev);
	};

	// Function to navigate back to homepage
	const handleHomeButton = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	// Function to handle like
	const handleLike = (e) => {
		e.preventDefault();
		likePost(id, currentUser._id);
		setLiked((prev) => !prev);
		liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
	};

	// Function to handle save post
	const handleSavePost = (e) => {
		e.preventDefault();
		if (saved === true) {
			dispatch(unsavePost({ id: id, userId: currentUser._id }));
		} else if (saved === false) {
			dispatch(savePost({ id: id, userId: currentUser._id }));
		}
		setSaved((prev) => !prev);
	};

	// Function to handle the comment submission
	const handleCommentSubmit = (e) => {
		e.preventDefault();
		const newComment = {
			currentUserId: currentUser._id,
			text: comment,
		};
		dispatch(commentPost({ id: id, formdata: newComment }))
			.unwrap()
			.then(() => {
				postComments.push({
					text: comment,
					user: currentUser,
				});
				setComment("");
			});
	};

	// Function to handle follow/unfollow
	const handleFollow = (e) => {
		e.preventDefault();
		if (followed === true) {
			dispatch(
				unfollowUser({ id: postUser._id, currentUserId: currentUser._id })
			);
		} else if (followed === false) {
			dispatch(
				followUser({ id: postUser._id, currentUserId: currentUser._id })
			);
		}
		setFollowed((prev) => !prev);
	};

	return (
		<div className="postpage">
			<div className="container postpage--container">
				{/* Navigate to Home Button */}
				<div className="postpage--homebtn">
					<MdArrowBackIosNew />
					<button onClick={handleHomeButton}>Back</button>
				</div>

				{/* Post Title */}
				<h1 className="postpage--title">{postDetails.title}</h1>

				{/* Post Image */}
				{postDetails.image ? (
					<div className="postpage--postImage">
						<div className="postpage--postImage--overlay">
							&copy; {postUser.username}
						</div>

						<img src={postDetails.image} alt={postDetails.image} />
					</div>
				) : (
					<div className="postpage--postImage--placeholder">
						 <Loader></Loader>
					</div>
				)}

				{/* Post Buttons */}
				<div className="postpage--buttons">
					<button
						className={
							liked
								? "postpage--button postpage--button--active"
								: "postpage--button"
						}
						onClick={handleLike}
					>
						<FaHeart size={16} /> {liked ? "Liked" : "Like Post"}
					</button>
					<button
						className={
							saved
								? "postpage--button postpage--button--active"
								: "postpage--button"
						}
						onClick={handleSavePost}
					>
						<FaStar size={18} /> {saved ? "Saved" : "Add to Saved"}
					</button>
					<a href="#comment" className="postpage--button">
						<BsFillChatDotsFill size={16} /> Add a Comment
					</a>
					<button className="postpage--button" onClick={toggleDonateModal}>
						<AiFillDollarCircle size={18} /> Support creator
					</button>
				</div>

				{/* Post Buttons Mobile */}
				<div className="postpage--buttons postpage--buttons--mobile">
					<button
						className={
							liked
								? "postpage--button postpage--button--active"
								: "postpage--button"
						}
						onClick={handleLike}
					>
						<FaHeart size={24} />
					</button>
					<button
						className={
							saved
								? "postpage--button postpage--button--active"
								: "postpage--button"
						}
						onClick={handleSavePost}
					>
						<FaStar size={26} />
					</button>
					<a href="#comment" className="postpage--button">
						<BsFillChatDotsFill size={24} />
					</a>
					<button className="postpage--button" onClick={toggleDonateModal}>
						<AiFillDollarCircle size={26} />
					</button>
				</div>

				{/* Post User */}
				<div className="postpage--user">
					{/* User Image */}
					<div className="postpage--user--image">
						<img
							src={
								postUser.profilePhoto
									? postUser.profilePhoto
									: userImagePlaceholder
							}
							alt=""
						/>
					</div>

					{/* Username */}
					<Link
						to={`/profile/${postUser._id}`}
						className="postpage--user--username"
					>
						{postUser.username}
					</Link>

					{/* Follow Button */}
					{postDetails.userId !== currentUser._id && (
						<div onClick={handleFollow}>
							{followed ? (
								<button className="postpage--user--followbtn">
									<FaCheck size={10} /> Following
								</button>
							) : (
								<button className="postpage--user--followbtn">
									<FaPlus size={10} /> Follow
								</button>
							)}
						</div>
					)}
				</div>

				{/* Post Stats */}
				<div className="postpage--stats">
					<p className="postpage--user--postTime">
						Posted {moment(postDetails.createdAt).fromNow()}
					</p>
					<p className="postpage--stat">
						<FaHeart /> {likes} Likes
					</p>
					<p className="postpage--stat">
						<BsFillChatDotsFill /> {postDetails.comments.length} Comments
					</p>
				</div>

				{/* Post Description */}
				<div className="postpage--desc">{postDetails.desc}</div>

				{/* Copyright */}
				<p className="postpage--copyright">
					All rights reserved &copy; {postUser.username}
				</p>

				{/* Comments Section */}
				<div className="postpage--comments" id="comment">
					<h2 className="postpage--comments--header">
						Comments ({postDetails.comments.length})
					</h2>

					{/* Comment form */}
					<div className="postpage--comments--input">
						<div className="postpage--comments--input--user">
							<img
								src={
									currentUser.profilePhoto
										? currentUser.profilePhoto
										: userImagePlaceholder
								}
								alt=""
							/>
						</div>
						<div className="postpage--comments--input--form">
							<textarea
								placeholder="Add a comment. Don't forget to be nice!"
								className="postpage--comments--input--field"
								name="comment"
								rows="auto"
								id="comment"
								value={comment}
								onChange={handleCommentChange}
							/>
							<button
								className="primary-btn postpage--comments--btn"
								onClick={handleCommentSubmit}
							>
								Submit
							</button>
						</div>
					</div>

					{/* Other Comments */}
					<div className="postpage--comments--cards">
						{postComments
							.slice(0)
							.reverse()
							.map((comment, index) => (
								<Comment key={index} data={comment} />
							))}
					</div>
				</div>
			</div>
			{donateModal && (
				<DonateModal setDonateModal={setDonateModal} user={postUser} />
			)}
		</div>
	);
};

export default Postpage;
