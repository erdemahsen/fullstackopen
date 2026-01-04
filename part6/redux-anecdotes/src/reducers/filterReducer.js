export const filterReducer = (state = "", action) => {
  //console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'FILTER_CHANGE':
      // console.log("", action.payload)
      return action.payload
    default:
      return state
  }
}

export const filterChange = filter => {
  // console.log("hi", filter)
  return {
      type: 'FILTER_CHANGE',
      payload: filter // this time no curly braces I want to access it with ease
    }
}

