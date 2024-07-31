import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type User = {
  email: string;
  name: string;
};

type UserState = {
  user: User | null;
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
      const token =localStorage.getItem("authTokenhive");
      const response = await fetch("https://taskhive-y97a.onrender.com/auth/check-auth", {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
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
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string || "An error occurred";
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
