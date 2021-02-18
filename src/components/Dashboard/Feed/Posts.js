import React, { useState, useEffect, useContext, Fragment } from 'react'
import axiosApiInstance from '../../interceptor'
import { UserContext } from '../Dashboard'

const Posts = () => {

  const { currentUser, friends } = useContext(UserContext)
  const [ posts, setPosts ] = useState([])

  useEffect( () => {
    // get all of currentUser and currentUser friends posts
    axiosApiInstance.get('http://localhost:3000/api/v1/')
  }, [posts])

  return (
    <Fragment>
      <div>[News feed Friend and your Posts component]</div>
    </Fragment>
  )
}

export default Posts
