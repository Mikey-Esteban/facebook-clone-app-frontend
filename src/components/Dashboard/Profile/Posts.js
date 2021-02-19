import React, { useState, useEffect, useContext, Fragment } from 'react'
import axiosApiInstance from '../../interceptor'
import { UserContext } from '../Dashboard'
import styled from 'styled-components'
import Post from './Post'

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`

const Posts = () => {

  const { currentUser } = useContext(UserContext)
  const [ posts, setPosts ] = useState([])

  useEffect( () => {
    // Api call for current users posts
    axiosApiInstance.get(`http://localhost:3000/api/v1/users/${currentUser.id}/posts`)
      .then( resp => {
        setPosts(resp.data.data)
      })
      .catch( resp => console.log(resp))
  }, [currentUser.id, posts.length])

  const toggleLike = (post, hasUserLiked) => {
    if (!hasUserLiked) {
      // Api call to like user post
      axiosApiInstance.post(`http://localhost:3000/api/v1/posts/${post.id}/likes`, { post: post})
        .then( resp => {
          debugger
        })
        .catch( resp => console.log(resp))
    } else {
      // find like
      const like = post.attributes.likes.filter(item => item.user_id === currentUser.id)[0]
      console.log('LIKE', like);
      // Api call to unlike user post
      axiosApiInstance.delete(`http://localhost:3000/api/v1/posts/${post.id}/likes/${like.id}`, { like: like})
        .then( resp => {
          debugger
        })
        .catch( resp => console.log(resp))
    }
  }

  const postsList = posts.map( item => <Post key={item.id} post={item} toggleLike={toggleLike} />)

  return (
    <CardWrapper>
      {postsList}
    </CardWrapper>
  )
}

export default Posts
