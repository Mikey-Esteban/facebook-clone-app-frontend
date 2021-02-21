import React, { useState, useEffect, useContext, Fragment } from 'react'
import axiosApiInstance from '../../interceptor'
import { UserContext } from '../Dashboard'
import Posts from '../Posts/Posts'


const Profile = () => {

  const { currentUser } = useContext(UserContext)
  const [ posts, setPosts ] = useState([])

  useEffect( () => {
    // Api call for current users posts
    axiosApiInstance.get(`http://localhost:3000/api/v1/users/${currentUser.id}/posts`)
      .then( resp => {
        debugger
        setPosts(resp.data.data)
        console.log(posts)
      })
      .catch( resp => console.log(resp))
  }, [currentUser.id, posts.length])

  return (
    <Fragment>
      <div>[ This is the User Profile Component ]</div>
      <div>
        [ All of {currentUser.name} posts should go here ]
        <Posts posts={posts} />
      </div>
    </Fragment>
  )
}

export default Profile
