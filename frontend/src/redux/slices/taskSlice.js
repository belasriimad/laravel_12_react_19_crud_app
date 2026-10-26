import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: null,
  orderBy: null,
  searchTerm: '',
  page: 1
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setCategoryId:(state, action) => {
            state.categoryId = action.payload
            state.page = 1
            state.orderBy = null
            state.searchTerm = ''
        },
        setOrderBy: (state, action) => {
            state.orderBy = action.payload
            state.page = 1
            state.categoryId = null
            state.searchTerm = ''
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
            state.page = 1
            state.orderBy = null
            state.categoryId = null
        },
        setPage: (state, action) => {
            state.page = action.payload
        }
    },
})

const taskReducer = taskSlice.reducer

export const { setCategoryId, setOrderBy, setSearchTerm, setPage } = taskSlice.actions

export default taskReducer