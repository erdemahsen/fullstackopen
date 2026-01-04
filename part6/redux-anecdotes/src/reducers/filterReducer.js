import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: "",
  reducers: {
    filterChange(state, action) {
      const filterText = action.payload
      return filterText
    },
  },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer