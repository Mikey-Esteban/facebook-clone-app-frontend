import React, { useContext } from 'react'
import { UserContext } from '../Dashboard'
import styled from 'styled-components'
import Comment from './Comment'
import NewComment from './NewComment'
import Button from '../../UI/buttons/Button'

const Card = styled.div`
  background: #fff;
`

const Post = (props) => {
  console.log(props);

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

  const commentsList = comments.map(item => <Comment key={item.id} comment={item}/> )

  return (
    <Card>
      <div>Post: {post.attributes.text}</div>
      <div>{likes.length} likes</div>
      {hasUserLiked() && <div>{currentUser.name} liked this post</div>}
      {LikeButton()}
      <div>{commentsList}</div>
      <NewComment post_id={post.id} />
    </Card>
  )
}

export default Post
