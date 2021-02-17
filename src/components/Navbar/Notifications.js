import React, { useContext } from 'react'
import Dropdown from '../UI/Dropdown'
import { UserContext } from '../Dashboard/Dashboard'

const Notifications = () => {

  const currentUser = useContext(UserContext)
  const notifications = currentUser.notifications.reverse()

  return (
    <Dropdown list={notifications} headerTitle={`${notifications.length} notifications`} />
  )
}

export default Notifications
