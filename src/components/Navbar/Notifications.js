import React, { useState, useContext } from 'react'
import axiosApiInstance from '../interceptor'
import Dropdown from '../UI/Dropdown'
import { UserContext } from '../Dashboard/Dashboard'

const Notifications = () => {

  const { currentUser } = useContext(UserContext)
  const [ notifications, setNotifications ] = useState(currentUser.notifications.reverse())

  const unreadNotificationsCount = () => {
    let count = 0
    notifications.forEach( item => {
      item.read === false && count++
    })
    return count
  }

  const showNotificationCount = () => {
    return unreadNotificationsCount() === 0 ? false : true ;
  }

  const handleReadNotifications = () => {
    notifications.forEach( item => {
      if (item.read === false) {
        item.read = true
        axiosApiInstance.patch(`http://localhost:3000/api/v1/users/${currentUser.id}/notifications/${item.id}`, { notification: item })
          .then( resp => console.log(resp.data.message))
          .catch( resp => console.log(resp))
      }
    })
    setNotifications(notifications)
  }

  return (
    <Dropdown headerTitle={`${unreadNotificationsCount()}`}
      showNotificationCount={showNotificationCount()}
      list={notifications}
      handleReadNotifications={handleReadNotifications}
    />
  )
}

export default Notifications
