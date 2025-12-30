const Notification = ({ notificationMessage }) => {
  if (!notificationMessage) return null

  const className = notificationMessage.isError
    ? 'notification error'
    : 'notification success'

  return (
    <div className={className}>
      {notificationMessage.message}
    </div>
  )
}

export default Notification
