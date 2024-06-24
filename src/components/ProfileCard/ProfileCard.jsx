import React from "react";
import "./ProfileCard.css";
import UserImagePlaceholder from "../../images/user image placeholder.jpg";
import { Link } from "react-router-dom";

const ProfileCard = ({ userData }) => {
  return (
    <Link to={`/profile/${userData._id}`} className="profileCard__container">
      {/* DP and Banner */}
      <div className="profileCard__banner">
        <div className="profileCard__profileImg">
          <img
            src={
              userData.profilePhoto
                ? userData.profilePhoto
                : UserImagePlaceholder
            }
            alt="dp"
          />
        </div>
      </div>
      {/* Name, Username, Headline */}
      <div className="profileCard__info">
        <h1 className="profileCard__name">
          {userData.firstname + " " + userData.lastname}
        </h1>
        <p className="profileCard__username">@{userData.username}</p>
        <p className="profileCard__bio">
          {userData.bio ? `${userData.bio}` : "No Bio"}
        </p>
      </div>
      {/* Profile Stats */}
      <div className="profileCard__stats">
        <section className="profileCard__stat">
          <p className="stat__num">{userData.followers.length}</p>
          <p className="stat__label">Followers</p>
        </section>
        <section className="profileCard__stat">
          <p className="stat__num">{userData.following.length}</p>
          <p className="stat__label">Followings</p>
        </section>
      </div>
    </Link>
  );
};

export default ProfileCard;
