import React, { useState, useEffect, useContext, Fragment } from 'react'
import axiosApiInstance from '../../interceptor'
import { UserContext } from '../Dashboard'
import styled from 'styled-components'
import Button from '../../UI/buttons/Button'

const Card = styled.div`
  background: #fff;
`

const Post = (props) => {
  console.log(props);

  const { currentUser } = useContext(UserContext)
  const [ post, setPost ] = useState({})
  const [ likes, setLikes ] = useState([])
  const [ hasUserLiked, setHasUserLiked ] = useState(false)
  const [ loaded, setLoaded ] = useState(false)

  useEffect( () => {
    // Api call to get specific post
    axiosApiInstance.get(`http://localhost:3000/api/v1/posts/${props.id}`)
      .then( resp => {
        setPost(resp.data.data)
        setLikes(resp.data.data.attributes.likes)
        // filter to see if current user is there
        const user = likes.filter(item => item.user_id === currentUser.id)
        user.length === 0 ? setHasUserLiked(false) : setHasUserLiked(true) ;
        setLoaded(true)
      })
  }, [props.id, likes.length, post])

  const LikeButton = () => {
    let button;
    hasUserLiked ?
      button = <Button onClick={ () => props.toggleLike(post, hasUserLiked) }>UnLike</Button>:
      button = <Button onClick={ () => props.toggleLike(post, hasUserLiked) }>Like</Button> ;
    return button
  }

  return (
    loaded &&
    <Card>
      <div>Post: {post.attributes.text}</div>
      <div>{likes.length} likes</div>
      {hasUserLiked && <div>{currentUser.name} liked this post</div>}
      {LikeButton()}
    </Card>
  )
}

export default Post
