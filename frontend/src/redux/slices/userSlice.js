import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials:(state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoggedIn = false
        }
    },
})

const userReducer = userSlice.reducer

export const { setCredentials, logout } = userSlice.actions

export default userReducer