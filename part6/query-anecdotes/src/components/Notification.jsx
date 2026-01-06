import NotificationContext from "../NotificationContext"

import {useContext} from 'react'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  //if (true) return null
  const { notification } = useContext(NotificationContext)

  if(notification === "") {
    return <></>
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
