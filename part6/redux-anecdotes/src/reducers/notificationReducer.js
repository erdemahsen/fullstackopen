import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: "Reducer initial message :)",
  reducers: {
    notificationChange(state, action) {
      //const filterText = action.payload
      //return filterText
      return state
    },
  },
})

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer