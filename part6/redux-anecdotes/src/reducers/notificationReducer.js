import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
        return ""
    }
  },
})

const { setNotification, removeNotification } = notificationSlice.actions

export const notifHere = (notifText, time) => {
  return async (dispatch) => {
    dispatch(setNotification(notifText))

    setTimeout(() => {
      dispatch(removeNotification())
    }, time*1000)
    
  }
}
export default notificationSlice.reducer