import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterContent(state , action ){
            return state = action.payload
        }

    }
})

export const { filterContent } = filterSlice.actions
export default filterSlice.reducer