//! This file contains all the redux logic for posts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as PostApi from "../api/PostApi";

const initialState = {
  postData: [],
  loading: null,
  error: null,
  errorMessage: null,
  postsLoading: null,
  postsLoadingError: null,
  postDeleting: null,
  postDeletingError: null,
  postUpdating: null,
  postUpdatingError: null,
  postCommenting: null,
  postCommentingError: null,
};

export const uploadPost = createAsyncThunk(
  "post/uploadPost",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await PostApi.uploadPost(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      await PostApi.deletePost(id, userId);
      return id;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/editPost",
  async ({ id, formdata }, { rejectWithValue }) => {
    try {
      await PostApi.updatePost(id, formdata);
      return { id, formdata };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const commentPost = createAsyncThunk(
  "post/commentPost",
  async ({ id, formdata }, { rejectWithValue }) => {
    try {
      await PostApi.commentPost(id, formdata);
      return { id, formdata };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getSavedPosts = createAsyncThunk(
  "post/getSavedPosts",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await PostApi.getSavedPosts(id);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getFollowingPosts = createAsyncThunk(
  "post/getFollowingPosts",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await PostApi.getFollowingPosts(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getPopularPosts = createAsyncThunk(
  "post/getPopularPosts",
  async () => {
    try {
      const { data } = await PostApi.getPopularPosts();
      return data;
    } catch (error) {
      return error?.response?.data?.message;
    }
  }
);

export const getNewestPosts = createAsyncThunk(
  "post/getNewestPosts",
  async () => {
    try {
      const { data } = await PostApi.getNewestPosts();
      return data;
    } catch (error) {
      return error?.response?.data?.message;
    }
  }
);

const PostSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(uploadPost.pending, (state, action) => {
        // if upload is pending, set loading to true
        state.loading = true;
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        // if upload successful, set the new post to postData
        state.postData.push(action.payload);
        state.loading = false;
      })
      .addCase(uploadPost.rejected, (state, action) => {
        // if upload failed, set error to true and error message to error
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })
      .addCase(getFollowingPosts.pending, (state, action) => {
        // if posts are loading, set loading to true
        state.postsLoading = true;
      })
      .addCase(getFollowingPosts.fulfilled, (state, action) => {
        // if posts have loaded, set post data to payload
        state.postData = action.payload;
        state.postsLoading = false;
      })
      .addCase(getFollowingPosts.rejected, (state, action) => {
        // if posts loading failed, set errors to true
        state.loading = false;
        state.postsLoadingError = action.payload;
      })
      .addCase(getNewestPosts.pending, (state, action) => {
        // if posts are loading, set loading to true
        state.postsLoading = true;
      })
      .addCase(getNewestPosts.fulfilled, (state, action) => {
        // if posts have loaded, set post data to payload
        state.postData = action.payload;
        state.postsLoading = false;
      })
      .addCase(getNewestPosts.rejected, (state, action) => {
        // if posts loading failed, set errors to true
        state.loading = false;
        state.postsLoadingError = action.payload;
      })
      .addCase(getPopularPosts.pending, (state, action) => {
        // if posts are loading, set loading to true
        state.postsLoading = true;
      })
      .addCase(getPopularPosts.fulfilled, (state, action) => {
        // if posts have loaded, set post data to payload
        state.postData = action.payload;
        state.postsLoading = false;
      })
      .addCase(getPopularPosts.rejected, (state, action) => {
        // if posts loading failed, set errors to true
        state.loading = false;
        state.postsLoadingError = action.payload;
      })
      .addCase(getSavedPosts.pending, (state, action) => {
        // if posts are loading, set loading to true
        state.postsLoading = true;
      })
      .addCase(getSavedPosts.fulfilled, (state, action) => {
        // if posts have loaded, set post data to payload
        state.postData = action.payload;
        state.postsLoading = false;
      })
      .addCase(getSavedPosts.rejected, (state, action) => {
        // if posts loading failed, set errors to true
        state.loading = false;
        state.postsLoadingError = action.payload;
      })
      .addCase(deletePost.pending, (state, action) => {
        // if post is deleting, set loading to true
        state.postDeleting = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        // if post has been deleted, update the postData
        const newPostData = state.postData.filter(
          (post) => post._id !== action.payload
        );
        state.postData = newPostData;
        state.postDeleting = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        // if post deleting has failed set error message
        state.postDeleting = false;
        state.postDeletingError = action.payload;
      })
      .addCase(updatePost.pending, (state, action) => {
        // if post is updating, set loading to true
        state.postUpdating = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        // if post has been updated, update the postData
        const newPostData = state.postData.map((post) =>
          post._id === action.payload.id
            ? { ...post, ...action.payload.formdata }
            : post
        );
        state.postData = newPostData;
        state.postUpdating = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        // if post updating has failed set error message
        state.postUpdating = false;
        state.postUpdatingError = action.payload;
      })
      .addCase(commentPost.pending, (state, action) => {
        // if comment is loading, set loading to true
        state.postCommenting = true;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        // if comment is successful, update the postData
        const newPostData = state.postData.map((post) =>
          post._id === action.payload.id
            ? { ...post, ...action.payload.formdata }
            : post
        );
        state.postData = newPostData;
        state.postCommenting = false;
      })
      .addCase(commentPost.rejected, (state, action) => {
        // if comment is rejected, set error message
        state.postCommenting = false;
        state.postCommentingError = action.payload;
      });
  },
});

export default PostSlice.reducer;
