import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'

export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>