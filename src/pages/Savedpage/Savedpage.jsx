import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/PostCard/PostCard";
import { getSavedPosts } from "../../redux/PostSlice";
import "./Savedpage.css";
import Loader from "../../components/Loader/Loader";

const Savedpage = () => {
  const dispatch = useDispatch();

  // Get the current user from the store
  const currentUser = useSelector((state) => state.auth.authData.user);

  // Get the posts from store
  const { postData, postsLoading, postsLoadingError } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(getSavedPosts(currentUser._id));
    // we want to refresh the saved postData whenever someone unsaves a post in the saved page to instantly remove that post from the page. So we trigger the useEffect whenever the savedPosts array of the current user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.savedPosts]);

  return (
    <div className="savedpage">
      <div className="savedpage__container container">
        {/* Search Bar */}
        <div className="savedpage__header--container">
          <h1 className="savedpage__heading">Accent - Saved</h1>
          <p className="savedpage__desc">Find all your saved posts here</p>
        </div>
        {/* Results Section */}

        {postsLoading ? (
          postsLoadingError ? (
            <p>{postsLoadingError}</p>
          ) : (
            <Loader></Loader>
          )
        ) : (
          <div className="saved__feed--posts">
            {postData.map((post) => {
              return <PostCard data={post} key={post._id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Savedpage;
