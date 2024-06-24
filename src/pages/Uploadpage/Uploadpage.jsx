import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Uploadpage.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { uploadPost } from "../../redux/PostSlice";
import { useNavigate } from "react-router-dom";

const Uploadpage = () => {
	// Get user details from redux store
	const user = useSelector((state) => state.auth.authData);
	const name = user.user.firstname;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get upload loading state from global state
	const loading = useSelector((state) => state.post.loading);

	// Get the error state and error message from global state
	const error = useSelector((state) => state.post.error);
	const errorMsg = useSelector((state) => state.post.errorMessage);

	//State to store the title and handle title change
	const [title, setTitle] = useState("");
	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	//State to store the description and handle description change
	const [desc, setDesc] = useState("");
	const handleDescChange = (e) => {
		setDesc(e.target.value);
	};

	// State to store upload button state
	const [btnDisabled, setBtnDisabled] = useState(false);

	// State for image error message
	const [imageErrorMessage, setImageErrorMessage] = useState(null);

	// State to store the selected image and handle image change
	const [image, setImage] = useState(null);
	const imageRef = useRef();
	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			setImage(img);
			setImageErrorMessage(null);
		}
	};

	// State to store the image uploading progress
	const [progress, setProgress] = useState(null);

	// State to store the copyright check
	const [confirm, setConfirm] = useState(false);
	const handleConfirm = (e) => {
		if (e.target.checked) {
			setConfirm(true);
		} else {
			setConfirm(false);
		}
	};

	// Function to upload image and save post to database
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		// check if the image is attached
		if (!image) {
			setImageErrorMessage("No file attached! Please try again.");
			return;
		} else if (image.size > 2 * 1024 * 1024) {
			setImageErrorMessage(
				"File size too big! Please compress your file to a smaller size."
			);
			return;
		}
		setBtnDisabled(true);
		const imageName = new Date().getTime() + name + image.name;
		const storageRef = ref(storage, `posts/${imageName}`);
		const uploadTask = uploadBytesResumable(storageRef, image);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},
			(error) => {
				setImageErrorMessage(error);
				setBtnDisabled(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					const newPost = {
						userId: user.user._id,
						title: title,
						desc: desc,
						image: downloadURL,
					};
					dispatch(uploadPost(newPost))
						.unwrap()
						.then(() => {
							navigate("../home", { replace: true });
							setBtnDisabled(false);
						});
				});
			}
		);
	};

	return (
		<div className="uploadpage">
			<div className="container uploadpage--container">
				<div className="upload--form--container">
					{/* Form Header */}
					<h1 className="upload--form--header">Upload Post</h1>
					<p className="upload--form--subheading">
						Created something new, <span>{name}</span>? Share it with the world
						now!
					</p>
					{/* Form Body */}
					<form className="upload--form--body" onSubmit={handleFormSubmit}>
						{/* Photo Browse */}
						{!image && (
							<div className="upload--form--file--container">
								<div
									className="upload--form--file"
									onClick={() => imageRef.current.click()}
								>
									<p>Click here to browse images</p>
									<p>16:9 aspect ratio recommended. Max size: 2MB</p>
									<p>
										Make sure to have some kind of watermark on your creation.
									</p>
								</div>
							</div>
						)}

						{/* Image Preview */}
						{image && (
							<div className="upload--form--preview">
								<p className="upload--form--preview--title">Preview: </p>
								<AiFillCloseCircle
									className="upload--form--preview--closeBtn"
									onClick={() => {
										setImage(null);
										imageRef.current.value = null;
									}}
								/>
								<div className="upload--form--preview--image">
									<img src={URL.createObjectURL(image)} alt="uploadImage" />
								</div>
							</div>
						)}

						{/* Title */}
						<div className="upload--form--input">
							<label htmlFor="title">Title: </label>
							<input
								type="text"
								placeholder="Give your post a title"
								name="title"
								id="title"
								value={title}
								onChange={handleTitleChange}
							/>
						</div>

						{/* Description */}
						<div className="upload--form--input">
							<label htmlFor="desc">Description: </label>
							<textarea
								placeholder="Let's add some description"
								className="upload--form--input--field"
								name="desc"
								rows="auto"
								id="desc"
								value={desc}
								onChange={handleDescChange}
							/>
						</div>

						{/* Tags */}
						{/* <div className="upload--form--input">
              <label htmlFor="tags">Tags: </label>
              <input
                type="text"
                placeholder="Add a few relevant tags (comma separated)"
                name="tags"
                id="tags"
              />
            </div> */}

						{/* Image Input */}
						<div className="upload--form--imageInput">
							<input
								type="file"
								name="uploadImage"
								id="uploadImage"
								accept="image/*"
								ref={imageRef}
								onChange={onImageChange}
							/>
						</div>

						{/* Confirm */}
						<div className="upload--form--confirm">
							<input
								type="checkbox"
								name="confirm"
								id="confirm"
								onChange={handleConfirm}
							/>
							<label htmlFor="confirm">
								I confirm that this post is my own creation.
							</label>
						</div>

						{/* Error Message */}
						{imageErrorMessage && (
							<p className="upload--form--error--message">
								⚠️{imageErrorMessage}
							</p>
						)}
						{error && (
							<p className="upload--form--error--message">⚠️{errorMsg}</p>
						)}

						{/* Submit Button */}
						<button
							className={
								progress || loading || btnDisabled || !confirm
									? "primary-btn upload--submit--btn btn-disabled"
									: "primary-btn upload--submit--btn "
							}
							type="submit"
							disabled={progress || loading || btnDisabled || !confirm}
						>
							{progress !== null && progress < 100
								? `Uploading Image ${progress}%`
								: progress === 100 || loading
								? "Saving your Post"
								: "Upload"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Uploadpage;
