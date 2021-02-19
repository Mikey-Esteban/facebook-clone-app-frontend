import React, { useState, useEffect, useContext, Fragment } from 'react'
import axiosApiInstance from '../../interceptor'
import { UserContext } from '../Dashboard'

const Posts = () => {

  const { currentUser, friends } = useContext(UserContext)
  console.log(currentUser);
  console.log(friends);
  const [ posts, setPosts ] = useState([])

  useEffect( () => {
    // grab users posts
    axiosApiInstance.get(`http://localhost:3000/api/v1/users/${currentUser.id}/posts`)
      .then( resp => {
        resp.data.data.forEach(item => setPosts(posts => [...posts, item]) )
      })
      .catch( resp => console.log(resp))
    // go through friends array, append posts
    friends.forEach( item => {
      const user_id = item.id
      axiosApiInstance.get(`http://localhost:3000/api/v1/users/${user_id}/posts`)
        .then( resp => {
          resp.data.data.forEach(item => setPosts(posts => [...posts, item]) )
        })
        .catch( resp => console.log(resp))
    })
  }, [])


  const allPosts = posts.map((item, index) => <div>{item.attributes.text} {index}</div>)

  return (
    <Fragment>
      <div>[News feed Friend and your Posts component]</div>
      {allPosts}
    </Fragment>
  )
}

export default Posts
