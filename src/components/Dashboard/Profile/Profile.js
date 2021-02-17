import React, { useContext, Fragment } from 'react'
import { UserContext } from '../Dashboard'
import Posts from './Posts'


const Profile = () => {

  const currentUser = useContext(UserContext)

  return (
    <Fragment>
      <div>[ This is the User Profile Component ]</div>
      <div>
        [ All of {currentUser.name} posts should go here ]
        <Posts />
      </div>
    </Fragment>
  )
}

export default Profile
