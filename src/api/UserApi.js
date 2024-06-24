//! This file contains all the API calls related to users

import API from "./axiosApi";

// Api call for getting a user
export const getUser = (id) => API.get(`/user/${id}`);

// Api call for getting users through search
export const getUserSearch = (query) => API.get(`/user/search/${query}`);

// Api call for getting a users followers
export const getUserFollowers = (id) => API.get(`/user/${id}/followers`);

// Api call for getting a users followers
export const getUserFollowings = (id) => API.get(`/user/${id}/following`);

// Api call for editing a user's details
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);

// Api call for following a user
export const followUser = (id, currentUserId) =>
	API.put(`/user/${id}/follow`, { currentUserId: currentUserId });

// Api call for unfollowing a user
export const unfollowUser = (id, currentUserId) =>
	API.put(`/user/${id}/unfollow`, { currentUserId: currentUserId });
