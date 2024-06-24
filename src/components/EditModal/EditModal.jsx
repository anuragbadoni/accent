import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/PostSlice";
import "./EditModal.css";

const EditModal = ({ post, currentUser, setEditModal }) => {
	const dispatch = useDispatch();

	// Get the updating loading state from store
	const postUpdating = useSelector((state) => state.post.postUpdating);

	// To store state of the title
	const [title, setTitle] = useState(post.title);

	// To handle title change
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	// To store the state of the description
	const [desc, setDesc] = useState(post.desc);

	// To handle the description change
	const handleDesc = (e) => {
		setDesc(e.target.value);
	};

	// To handle the edit submission
	const handleEdit = (e) => {
		e.preventDefault();
		const formdata = {
			userId: currentUser._id,
			title: title,
			desc: desc,
		};
		if (post.userId._id === currentUser._id) {
			dispatch(updatePost({ id: post._id, formdata: formdata }))
				.unwrap()
				.then(() => {
					setEditModal(false);
					window.location.reload();
				});
		} else {
			console.log("Post creator and current user is not the same");
		}
	};

	return (
		<div className="editmodal">
			<div className="editmodal--container">
				{/* Form Header */}
				<div className="editmodal--header">
					<h1 className="editmodal--form--heading">Edit Post</h1>
					<p className="editmodal--form--subheading">
						You can only edit the title and the description.<br></br> If you
						want to change the image then please delete this post and upload a
						new post.
					</p>
				</div>
				{/* Form Body */}
				<form className="editmodal--form--body">
					{/* Title */}
					<div className="editmodal--form--input">
						<label htmlFor="title">Title: </label>
						<input
							type="text"
							placeholder="Give your post a title"
							name="title"
							id="title"
							value={title}
							onChange={handleTitle}
						/>
					</div>

					{/* Description */}
					<div className="editmodal--form--input">
						<label htmlFor="desc">Description: </label>
						<textarea
							placeholder="Let's add some description"
							className="editmodal--form--input--field"
							name="desc"
							rows="auto"
							id="desc"
							value={desc}
							onChange={handleDesc}
						/>
					</div>

					{/* Submit Button */}
					<div className="editmodal--buttons">
						<button
							className="secondary-btn editmodal--btn"
							onClick={() => setEditModal(false)}
						>
							Cancel
						</button>
						<button className="primary-btn editmodal--btn" onClick={handleEdit}>
							{postUpdating ? "Saving Post" : "Save Edit"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditModal;
