import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
	id: number
	fullName: string
	username: string
	isBlocked: boolean
	registrationDate: string
	lastLoginDate: string
}

interface UserState {
	users: User[]
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex((user) => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
	      // ky.put(`/api/users/${index}`, { json: action.payload }) запрос на изменение юзера
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload)
	    // ky.delete(`/api/users/${action.payload}`) запрос на удаление юзера
    },
  },
});

export const { setUsers, updateUser, deleteUser } = userSlice.actions

export default userSlice.reducer