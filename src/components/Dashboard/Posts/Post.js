import React, { useState, useEffect, useContext, Fragment } from 'react'
import { UserContext } from '../Dashboard'
import axiosApiInstance from '../../interceptor'
import styled from 'styled-components'
import Comment from './Comment'
import NewComment from './NewComment'
import OrangeButton from '../../UI/buttons/OrangeButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComments } from '@fortawesome/free-solid-svg-icons'

const Card = styled.div`
  background: #fff;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  color: #666666;
  margin:10px;
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  color: #979797; /* dark gray */
`

const ImageWrapper = styled.div`
  img {
    width: 64px;
    border-radius: 50%;
  }
`
const PostText = styled.div`
  padding: 10px 20px;
`

const LikesDetails = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
`

const IconsWrapper = styled.div`
  display: flex;
  gap: 10px;

  & > * {
    cursor: pointer;
  }
`

const sortThis = (array) => {
  function compare( a, b ) {
    if (new Date(a.created_at) > new Date(b.created_at))
       return -1;
    if (new Date(a.created_at) < new Date(b.created_at))
      return 1;
    return 0;
  }

  const sorted = array.sort(compare)
  return sorted
}

const Post = (props) => {

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
        setComments(sortThis(resp.data.data.attributes.comments))
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
      button = <FontAwesomeIcon icon={faHeart} color="#d0102b" onClick={ () => toggleLike(true) } />:
      button = <FontAwesomeIcon icon={faHeart} color="#979797" onClick={ () =>toggleLike(false) } /> ;
    return button
  }

  const commentsList = comments.map(item => <Comment key={item.id} comment={item}/> )

  return (
    <Fragment>
      { loaded &&
        <Card>
          <Header>
            <ImageWrapper>
              <img src={currentUser.profile.image_url} alt=""/>
            </ImageWrapper>
            <h3>{post.attributes.author}</h3>
          </Header>
          <PostText>{post.attributes.text}</PostText>
          <LikesDetails>
            {likes.length} likes
            {checkIfUserLiked() && <div>You liked this post</div>}
          </LikesDetails>
          <IconsWrapper>
            {LikeButton()}
            <FontAwesomeIcon icon={faComments} color="#979797" onClick={handleViewComments} />
          </IconsWrapper>
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
