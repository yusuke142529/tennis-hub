// lib/store/uiSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        toastMessage: ''
    },
    reducers: {
        showToast(state, action) { state.toastMessage = action.payload },
        clearToast(state) { state.toastMessage = '' }
    }
})

export const { showToast, clearToast } = uiSlice.actions
export default uiSlice.reducer