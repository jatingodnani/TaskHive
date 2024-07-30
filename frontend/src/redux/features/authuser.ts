// features/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// types.ts
export interface User {
    _id: string;
    email: string;
    fullname:string;
  }
  
  export interface UserState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
};


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('http://localhost:8000/taskhive/auth-users',{
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: User[] = await response.json();
  return data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        console.log(state.users)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default userSlice.reducer;
