import React, { useState, useEffect, useContext, Fragment } from 'react'
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
  const [ loaded, setLoaded ] = useState(false)
  const [ post, setPost ] = useState({})
  const [ comments, setComments ] = useState([])
  const [ likes, setLikes ] = useState([])
  const [ viewComments, setViewComments ] = useState(false)
  const [ newComment, setNewComment ] = useState({})

  useEffect( () => {
    // get post details
    axiosApiInstance.get(`http://localhost:3000/api/v1/posts/${props.post.id}`)
      .then( resp => {
        setPost(resp.data.data)
        setLikes(resp.data.data.attributes.likes)
        setComments(resp.data.data.attributes.comments)
        setNewComment({commenter: currentUser.name, user_id: currentUser.id, post_id: post.id})
        setLoaded(true)
      })
      .catch( resp => console.log(resp) )
  }, [likes.length, comments.length])


  const toggleLike = (hasUserLiked) => {
    if (!hasUserLiked) {
      // Api call to like user post
      axiosApiInstance.post(`http://localhost:3000/api/v1/posts/${post.id}/likes`, { post: post})
        .then( resp => setLikes( likes => [...likes, resp.data.data]) )
        .catch( resp => console.log(resp))
    } else {
      // find like
      const like = post.attributes.likes.filter(item => item.user_id === currentUser.id)[0]
      // Api call to unlike user post
      axiosApiInstance.delete(`http://localhost:3000/api/v1/posts/${post.id}/likes/${like.id}`, { like: like})
        // filter out like
        .then( resp => setLikes( likes.filter(item => item.user_id !== currentUser.id)) )
        .catch( resp => console.log(resp))
    }
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
        // reset comment
        setNewComment({commenter: currentUser.name, user_id: currentUser.id, post_id: post.id})
        // add comment to comments
        setComments(comments => [...comments, newComment])
      })
      .catch( resp => console.log(resp))
  }

  const checkIfUserLiked = () => {
    // check to see if user has already liked post
    const user = likes.filter(item => item.user_id === currentUser.id)
    return user.length > 0
  }

  const LikeButton = () => {
    let button;
    checkIfUserLiked() ?
      button = <Button onClick={ () => toggleLike(true) }>UnLike</Button>:
      button = <Button onClick={ () =>toggleLike(false) }>Like</Button> ;
    return button
  }


  const commentsList = comments.map(item => <Comment key={item.id} comment={item}/> )

  return (
    <Fragment>
      { loaded &&
        <Card>
          <div>{post.attributes.author} wrote</div>
          <div>{post.attributes.text}</div>
          <div>{likes.length} likes</div>
          {checkIfUserLiked() && <div>{currentUser.name} liked this post</div>}
          {LikeButton()}
          <OrangeButton onClick={handleViewComments}>View Comments</OrangeButton>
          {viewComments && <div>{commentsList}</div>}
          <NewComment comment={newComment}
                      handleChange={handleCommentChange}
                      handleSubmit={handleCommentSubmit} />
        </Card>
      }
    </Fragment>
  )
}

export default Post
