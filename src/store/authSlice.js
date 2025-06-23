import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // Authentication status
  userData: null, // User data from Appwrite
  userId: null, // User ID from Appwrite
  profileId: null, // Profile document ID from Appwrite
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.userId = action.payload.userData.$id; // Store user ID
      state.profileId = action.payload.profileId; // Store profile ID
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.userId = null;
      state.profileId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;