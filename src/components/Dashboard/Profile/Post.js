import React, { useContext } from 'react'
import { UserContext } from '../Dashboard'
import styled from 'styled-components'
import Button from '../../UI/buttons/Button'

const Card = styled.div`
  background: #fff;
`

const Post = (props) => {

  const { currentUser } = useContext(UserContext)
  const { post } = props
  const likes = post.attributes.likes
  const comments = post.attributes.comments

  const hasUserLiked = () => {
    // check to see if user has already liked post
    const user = likes.filter(item => item.user_id === currentUser.id)
    return user.length > 0
  }

  const LikeButton = () => {
    let button;
    hasUserLiked() ?
      button = <Button onClick={ () => props.toggleLike(post, hasUserLiked) }>UnLike</Button>:
      button = <Button onClick={ () => props.toggleLike(post, hasUserLiked) }>Like</Button> ;
    return button
  }

  // const commentsList = comments.map(item => <p>{item.attributes.}</p>)

  return (
    <Card>
      <div>Post: {post.attributes.text}</div>
      <div>{likes.length} likes</div>
      {hasUserLiked() && <div>{currentUser.name} liked this post</div>}
      {LikeButton()}
      <div></div>
    </Card>
  )
}

export default Post
