import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PostCard.css";
import { FaHeart, FaStar } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdEdit, MdDelete } from "react-icons/md";
import { likePost } from "../../api/PostApi";
import { useDispatch, useSelector } from "react-redux";
import { savePost, unsavePost } from "../../redux/AuthSlice";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import userImagePlaceholder from "../../images/user image placeholder.jpg";

const PostCard = (post) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get the current user id
	const currentUser = useSelector((state) => state.auth.authData.user);
	const currentUserId = currentUser._id;

	// Get the post details from props
	const { _id, image, userId, likes, title } = post.data;

	// To store the post user details
	const postUser = userId;

	// To store the liked state of the post
	const [liked, setLiked] = useState(likes.includes(currentUserId));

	// To store the likes count of the post
	const [likesCount, setLikesCount] = useState(likes.length);

	// Function to handle like
	const handleLike = (e) => {
		e.preventDefault();
		likePost(_id, currentUserId);
		setLiked((prev) => !prev);
		liked
			? setLikesCount((prev) => prev - 1)
			: setLikesCount((prev) => prev + 1);
	};

	// To store the saved state of the post
	const [saved, setSaved] = useState(currentUser.savedPosts.includes(_id));

	// Function to handle save post
	const handleSavePost = (e) => {
		e.preventDefault();
		if (saved === true) {
			dispatch(unsavePost({ id: _id, userId: currentUserId }));
		} else if (saved === false) {
			dispatch(savePost({ id: _id, userId: currentUserId }));
		}
		setSaved((prev) => !prev);
	};

	// To store the options dropdown state
	const [dropdown, setDropdown] = useState(false);

	// Function to handle options
	const handleOptions = (e) => {
		e.preventDefault();
		setDropdown((prev) => !prev);
	};

	// To store delete modal state
	const [deleteModal, setDeleteModal] = useState(false);

	// Function to toggle delete modal open/close
	const handleDeleteModal = (e) => {
		e.preventDefault();
		setDeleteModal((prev) => !prev);
		setDropdown(false);
	};

	// To store the edit modal state
	const [editModal, setEditModal] = useState(false);

	// Function to toggle edit modal open/close
	const handleEditModal = (e) => {
		e.preventDefault();
		setEditModal((prev) => !prev);
		setDropdown(false);
	};

	// Function to navigate to post page
	const handleOpenPost = () => {
		navigate(`/post/${_id}`);
	};

	return (
		<div className="postcard__container">
			<div className="post__image" onClick={handleOpenPost}>
				<div className="post--title">{title}</div>
				<div className="post--image--overlay">&copy; {postUser.username}</div>
				<img src={image} alt="postimg" />
			</div>
			<div className="post__details">
				<div className="post__userInfo">
					<div className="post__userImg">
						<img
							src={
								postUser.profilePhoto
									? postUser.profilePhoto
									: userImagePlaceholder
							}
							alt="userimage"
						/>
					</div>
					<Link to={`/profile/${postUser._id}`} className="post__username">
						{postUser.username}
					</Link>
				</div>
				<div className="post__options">
					<button
						onClick={handleLike}
						className={
							liked
								? "post__options--icon post__options--icon--active"
								: "post__options--icon"
						}
					>
						<FaHeart />
						<p className="post__options--icon--count">{likesCount}</p>
						{/* <span className="tooltipcard">
              <p className="tooltiptext">Like</p>
            </span> */}
					</button>
					<button
						onClick={handleSavePost}
						className={
							saved
								? "post__options--icon post__options--icon--active"
								: "post__options--icon"
						}
					>
						<FaStar size={22} />
						{/* <span className="tooltipcard">
              <p className="tooltiptext">Save</p>
            </span> */}
					</button>
					{currentUserId === postUser._id && (
						<button
							onClick={handleOptions}
							className="post__options--icon userOptions"
						>
							<BiDotsHorizontalRounded />
						</button>
					)}
					{dropdown && (
						<div className="post__options--dropdown">
							<button
								className="post__options--option"
								onClick={handleEditModal}
							>
								<MdEdit size={16} /> Edit Post
							</button>
							<button
								className="post__options--option"
								onClick={handleDeleteModal}
							>
								<MdDelete size={16} /> Delete Post
							</button>
						</div>
					)}
				</div>
			</div>
			{deleteModal && (
				<DeleteModal
					postId={_id}
					postUserId={userId._id}
					imageUrl={image}
					currentUserId={currentUserId}
					setDeleteModal={setDeleteModal}
				/>
			)}
			{editModal && (
				<EditModal
					post={post.data}
					currentUser={currentUser}
					setEditModal={setEditModal}
				/>
			)}
		</div>
	);
};

export default PostCard;
