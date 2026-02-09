import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


// 1. Define the shape of your User object
interface User {
  id: string;
  email: string;
  name?: string;
  role?: string; // e.g., 'admin'
}

// 2. Define the shape of the entire Auth State
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isFetching: boolean;
}

// 3. Apply the interface to the initialState
const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isFetching: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 4. Use PayloadAction<User> to type the action parameter
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetching = false;
    },
    logOut: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isFetching = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;