import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileEditModal.css";
import userImagePlaceholder from "../../images/user image placeholder.jpg";
import { updateUser } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const ProfileEditModal = ({ setEditModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current user details from the store
  const currentUser = useSelector((state) => state.auth.authData.user);

  // To store the state of username
  const [username, setUsername] = useState(currentUser.username);
  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  // To store the state of the firstname
  const [firstname, setFirstname] = useState(currentUser.firstname);
  const firstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  // To store the state of the lastname
  const [lastname, setLastname] = useState(currentUser.lastname);
  const lastnameChange = (e) => {
    setLastname(e.target.value);
  };

  // To store the state of the bio
  const [bio, setBio] = useState(currentUser?.bio || "");
  const bioChange = (e) => {
    setBio(e.target.value);
  };

  // To store the state of the profilephoto
  const [profilephoto, setProfilePhoto] = useState(
    currentUser?.profilePhoto || ""
  );
  const imageRef = useRef();
  const imageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = URL.createObjectURL(e.target.files[0]);
      setProfilePhoto(img);
      setErrorMessage(null);
    }
  };

  // To store the state of the error messages
  const [errorMessage, setErrorMessage] = useState(null);

  // Get the update loading state from store
  const userUpdating = useSelector((state) => state.auth.userUpdating);

  // Get the updating error from the store
  const userUpdatingError = useSelector(
    (state) => state.auth.userUpdatingError
  );

  // State to store the image uploading progress
  const [progress, setProgress] = useState(null);

  // State to store upload button state
  const [btnDisabled, setBtnDisabled] = useState(false);

  // Function to upload profile photo and update post
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // check if profile photo is not being updated
    if (profilephoto === currentUser.profilePhoto || profilephoto === "") {
      const updatedUser = {
        currentUserId: currentUser._id,
        username: username,
        firstname: firstname,
        lastname: lastname,
        bio: bio,
      };
      dispatch(updateUser({ id: currentUser._id, formdata: updatedUser }))
        .unwrap()
        .then(() => {
          navigate(`/profile/${currentUser._id}`);
          window.location.reload();
          setEditModal(false);
        });
    } else {
      let profileImage = document.getElementById("profilePhoto").files[0];
      if (profileImage.size > 1 * 1024 * 1024) {
        setErrorMessage("Profile Photo size too big!");
        return;
      }
      const imageName = new Date().getTime() + currentUser.username;
      const storageRef = ref(storage, `profilePhotos/${imageName}`);
      const uploadTask = uploadBytesResumable(storageRef, profileImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          setErrorMessage(error);
          setBtnDisabled(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updatedUser = {
              currentUserId: currentUser._id,
              username: username,
              firstname: firstname,
              lastname: lastname,
              bio: bio,
              profilePhoto: downloadURL,
            };
            dispatch(updateUser({ id: currentUser._id, formdata: updatedUser }))
              .unwrap()
              .then(() => {
                navigate(`/profile/${currentUser._id}`);
                window.location.reload();
                setEditModal(false);
              });
          });
        }
      );
    }
  };

  return (
    <div className="profileeditmodal">
      <div className="profileeditmodal--container">
        {/* Form Header */}
        <div className="profileeditmodal--header">
          <h1 className="profileeditmodal--form--heading">Profile Settings</h1>
        </div>

        {/* Form Body */}
        <form
          className="profileeditmodal--form--body"
          onSubmit={handleFormSubmit}
        >
          {/* Profile Photo Preview */}
          <div
            className="profileeditmodal--form--image"
            onClick={() => {
              imageRef.current.click();
            }}
          >
            <div className="profileeditmodal--form--image--overlay">
              <p>CHANGE</p>
            </div>
            <img
              src={profilephoto === "" ? userImagePlaceholder : profilephoto}
              alt="profilephoto"
            />
          </div>

          {errorMessage && (
            <p className="profileeditmodal--photo--error">⚠️ {errorMessage}</p>
          )}

          {userUpdatingError && (
            <p className="profileeditmodal--form--error">
              ⚠️ {userUpdatingError}
            </p>
          )}

          {/* Username */}
          <div className="profileeditmodal--form--input">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              placeholder="Your username"
              name="username"
              id="username"
              value={username}
              onChange={usernameChange}
              required
            />
          </div>

          {/* FirstName */}
          <div className="profileeditmodal--form--input">
            <label htmlFor="firstname">First Name: </label>
            <input
              type="text"
              placeholder="Your first name"
              name="firstname"
              id="firstname"
              value={firstname}
              onChange={firstnameChange}
              required
            />
          </div>

          {/* LastName */}
          <div className="profileeditmodal--form--input">
            <label htmlFor="lastname">Last Name: </label>
            <input
              type="text"
              placeholder="Your last name"
              name="lastname"
              id="lastname"
              value={lastname}
              onChange={lastnameChange}
              required
            />
          </div>

          {/* Bio */}
          <div className="profileeditmodal--form--input">
            <label htmlFor="bio">Bio: </label>
            <input
              type="text"
              placeholder="Write something about yourself"
              name="bio"
              id="bio"
              value={bio}
              onChange={bioChange}
            />
          </div>

          {/* Image Input */}
          <div className="profileeditmodal--form--imageInput">
            <input
              type="file"
              name="profilePhoto"
              id="profilePhoto"
              accept="image/*"
              ref={imageRef}
              onChange={imageChange}
            />
          </div>
          {/* Submit Button */}
          <div className="profileeditmodal--buttons">
            <button
              className="secondary-btn profileeditmodal--btn"
              onClick={() => setEditModal(false)}
            >
              Cancel
            </button>
            <button
              className="primary-btn profileeditmodal--btn"
              type="submit"
              disabled={progress || userUpdating || btnDisabled}
            >
              {progress !== null && progress < 100
                ? `Uploading Image ${progress}%`
                : progress === 100 || userUpdating
                ? "Saving your details"
                : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
