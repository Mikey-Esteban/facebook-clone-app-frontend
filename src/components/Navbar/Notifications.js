import React, { useContext } from 'react'
import Dropdown from '../UI/Dropdown'
import { UserContext } from '../Dashboard/Dashboard'

const Notifications = (props) => {

  const { sentFriendRequests, receivedFriendRequests } = props
  const currentUser = useContext(UserContext)
  const notifications = currentUser.notifications

  const acceptedSentFriendRequests = sentFriendRequests.filter( item => item.attributes.status === 'accepted' )
  acceptedSentFriendRequests.forEach(item => {
    const data = {
      id: item.id,
      title: `${item.attributes['receiver_name']} added you back as a friend!`
    }
    // notifications.push(data)
  })

  receivedFriendRequests.forEach(item => {
    const data = {
      id: item.id,
      title: `${item.attributes['requestor_name']} sent you a friend request!`
    }
    // notifications.push(data)
  })

  return (
    <Dropdown list={notifications} headerTitle={`${notifications.length} notifications`} />
  )
}

export default Notifications
