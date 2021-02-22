import React, { useState, useContext } from 'react'
import { UserContext } from '../Dashboard'
import axiosApiInstance from '../../interceptor'
import styled from 'styled-components'
import Comment from './Comment'
import NewComment from './NewComment'
import Button from '../../UI/buttons/Button'
import OrangeButton from '../../UI/buttons/OrangeButton'

const Card = styled.div`
  background: #fff;
`

const Post = (props) => {
  console.log(props);

  const { currentUser } = useContext(UserContext)
  const { post } = props
  const likes = post.attributes.likes
  const comments = post.attributes.comments
  const [ viewComments, setViewComments ] = useState(false)
  const [ newComment, setNewComment ] = useState(
    {commenter: currentUser.name, user_id: currentUser.id, post_id: post.id}
  )

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

  const handleViewComments = () => {
    viewComments === true ? setViewComments(false) : setViewComments(true) ;
  }

  const handleCommentChange = e => {
    setNewComment({...newComment, [e.target.name]:e.target.value})
    console.log(newComment);
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()

    axiosApiInstance.post(`http://localhost:3000/api/v1/posts/${post.id}/comments`, { comment: newComment })
      .then( resp => {
        debugger
        // reset comment
        setNewComment({commenter: currentUser.name, user_id: currentUser.id, post_id: post.id})
        // add comment to comments
        comments.push(newComment)
      })
      .catch( resp => console.log(resp))
  }


  const commentsList = comments.map(item => <Comment key={item.id} comment={item}/> )

  return (
    <Card>
      <div>{post.attributes.author} wrote</div>
      <div>{post.attributes.text}</div>
      <div>{likes.length} likes</div>
      {hasUserLiked() && <div>{currentUser.name} liked this post</div>}
      {LikeButton()}
      <OrangeButton onClick={handleViewComments}>View Comments</OrangeButton>
      {viewComments && <div>{commentsList}</div>}
      <NewComment comment={newComment}
                  handleChange={handleCommentChange}
                  handleSubmit={handleCommentSubmit} />
    </Card>
  )
}

export default Post
