import React from 'react'
import Notification from './Notification'
import { notifications, NotificationProps } from './notification-const'

const NotificationsWrapper: React.FC = () => {
  return (
    <div className="space-y-2">
      {notifications.map((notification: NotificationProps, index: number) => (
        <Notification key={index} {...notification} />
      ))}
    </div>
  )
}

export default NotificationsWrapper