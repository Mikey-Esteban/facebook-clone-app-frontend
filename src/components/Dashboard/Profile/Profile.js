import React, { useState, useEffect, useContext, Fragment } from 'react'
import axiosApiInstance from '../../interceptor'
import { UserContext } from '../Dashboard'
import Posts from '../Posts/Posts'


const Profile = () => {

  const { currentUser } = useContext(UserContext)
  console.log(currentUser);
  const [ posts, setPosts ] = useState([])

  useEffect( () => {
    // Api call for current users posts
    axiosApiInstance.get(`http://localhost:3000/api/v1/users/${currentUser.id}/posts`)
      .then( resp => setPosts(resp.data.data) )
      .catch( resp => console.log(resp))
  }, [currentUser.id, posts.length])

  return (
    <Fragment>
      <div>[ This is the User Profile Component ]</div>
      <div>
        {currentUser.name}
        {currentUser.profile.bio}
        <img src={currentUser.profile.image_url} alt=""/>
      </div>
      <div>
        [ All of {currentUser.name} posts should go here ]
        <Posts posts={posts} />
      </div>
    </Fragment>
  )
}

export default Profile
