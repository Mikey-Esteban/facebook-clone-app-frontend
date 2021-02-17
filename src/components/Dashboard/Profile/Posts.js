import React, { useState, useEffect, useContext, Fragment } from 'react'
import { UserContext } from '../Dashboard'
import axiosApiInstance from '../../interceptor'
import Post from './Post'

const Posts = () => {

  const currentUser = useContext(UserContext)
  const [ posts, setPosts ] = useState([])

  useEffect( () => {
    // Api call for current users posts
    axiosApiInstance.get(`http://localhost:3000/api/v1/users/${currentUser.id}`)
      .then( resp => {
        debugger
        setPosts(resp.data.data.attributes.posts)
      })
      .catch( resp => console.log(resp))
  }, [currentUser.id])

  const postsList = posts.map( item => <Post key={item.id} attributes={item} />)

  return (
    <Fragment>
      {postsList}
    </Fragment>
  )
}

export default Posts
