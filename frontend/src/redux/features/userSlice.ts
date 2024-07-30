import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type UserState = {
  user: {
    email: string;
    name: string;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8000/auth/check-auth", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.authenticated;
        state.user = action.payload.user || null;
        state.error = null;
        console.log(state.isAuthenticated);
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
