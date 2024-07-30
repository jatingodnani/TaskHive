
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';

import authReducer from '../features/authuser';
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      authusers:authReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
