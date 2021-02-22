import React, { useState, useEffect, useContext } from 'react'
import axiosApiInstance from '../../interceptor'
import { UserContext } from '../Dashboard'
import styled from 'styled-components'
import NewPost from './NewPost'
import Posts from '../Posts/Posts'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Feed = () => {

  const { currentUser, friends } = useContext(UserContext)
  const [ userPosts, setUserPosts ] = useState([])
  const [ friendsPosts, setFriendsPosts ] = useState([])
  const [ post, setPost ] = useState({user_id: currentUser.id})

  useEffect( () => {
    // Api call for current user's posts
    axiosApiInstance.get(`http://localhost:3000/api/v1/users/${currentUser.id}/posts`)
      .then( resp => setUserPosts(resp.data.data) )
      .catch( resp => console.log(resp))
    // iterate through friends, make api call of that friend's posts
    friends.forEach(friend => {
      axiosApiInstance.get(`http://localhost:3000/api/v1/users/${friend.id}/posts`)
      .then( resp => {
        const friendPosts = resp.data.data
        friendPosts.forEach( post => setFriendsPosts(friendsPosts => [...friendsPosts, post]))
      })
        .catch( resp => console.log(resp))
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    axiosApiInstance.post('http://localhost:3000/api/v1/posts', { post: post })
      .then( resp => {
        setPost({user_id: currentUser.id})
        setUserPosts([...userPosts, resp.data.data])
      })
      .catch( resp => console.log(resp))
  }

  const handleChange = e => {
    setPost({...post, [e.target.name]:e.target.value})
  }

  const grabAllPosts = () => {

    function compare( a, b ) {
      if (new Date(a.attributes.created_at) > new Date(b.attributes.created_at))
         return -1;
      if (new Date(a.attributes.created_at) < new Date(b.attributes.created_at))
        return 1;
      return 0;
    }

    const posts = userPosts.concat(friendsPosts)
    const sortedPosts = posts.sort(compare)

    return sortedPosts
  }

  grabAllPosts()
  return (
    <Wrapper>
      <div>[This is the Feed component]</div>
      <NewPost currentUser={currentUser}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        post={post}
      />
      <Posts searchFriends={true} posts={grabAllPosts()} />
    </Wrapper>
  )
}

export default Feed
