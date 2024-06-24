import React from "react";
import "./UserCard.css";
import UserImagePlaceholder from "../../images/user image placeholder.jpg";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaCheck } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { followUser, unfollowUser } from "../../redux/AuthSlice";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the current user from the store
  const currentUser = useSelector((state) => state.auth.authData.user);

  // To store the followed state
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user._id)
  );

  // Function to navigate to post page
  const handleUserPage = () => {
    navigate(`/profile/${user._id}`);
  };

  // Function to handle follow/unfollow
  const handleFollow = (e) => {
    e.preventDefault();
    if (followed === true) {
      dispatch(unfollowUser({ id: user._id, currentUserId: currentUser._id }));
    } else if (followed === false) {
      dispatch(followUser({ id: user._id, currentUserId: currentUser._id }));
    }
    setFollowed((prev) => !prev);
  };

  return (
    <div className="usercard">
      <div className="usercard--container">
        {/* Top Section */}
        <div className="usercard--profile" onClick={handleUserPage}>
          <div className="usercard--profile--image">
            <img
              src={user.profilePhoto ? user.profilePhoto : UserImagePlaceholder}
              alt={user.username}
            />
          </div>
          <div className="usercard--profile--info">
            <p className="usercard--username">{user.username}</p>
            <p className="usercard--name">
              {user.firstname} {user.lastname}
            </p>
          </div>
        </div>
        {/* Divider */}
        <div className="usercard--divider"></div>
        {/* Bottom Section */}
        <div className="usercard--action">
          {followed ? (
            <button
              className="usercard--followbtn usercard--followbtn--active"
              onClick={handleFollow}
              disabled={user._id === currentUser._id}
            >
              <FaCheck /> Following
            </button>
          ) : (
            <button
              className="usercard--followbtn"
              onClick={handleFollow}
              disabled={user._id === currentUser._id}
            >
              <FaPlus /> Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
