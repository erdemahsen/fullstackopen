const Notification = ({notificationMessage}) => {
    if(notificationMessage === null)
    {
        return null
    }
  return (
    <div className="error">
        {notificationMessage}
    </div>
  )
}

export default Notification