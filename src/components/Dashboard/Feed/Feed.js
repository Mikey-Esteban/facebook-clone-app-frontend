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
  const [ posts, setPosts ] = useState([])
  const [ post, setPost ] = useState({user_id: currentUser.id})

  useEffect( () => {
    let allPosts = []
    // Api call for current users posts
    axiosApiInstance.get(`http://localhost:3000/api/v1/users/${currentUser.id}/posts`)
      .then( resp => {
        resp.data.data.forEach( item => allPosts.push(item) )
        // go through friends array, append posts
        friends.forEach( item => {
          const user_id = item.id
          axiosApiInstance.get(`http://localhost:3000/api/v1/users/${user_id}/posts`)
            .then( resp => {
              resp.data.data.forEach( item => allPosts.push(item) )
              setPosts(allPosts)
            })
            .catch( resp => console.log(resp))
        })
      })
      .catch( resp => console.log(resp))
  }, [currentUser.id, friends, posts.length])

  const handleSubmit = e => {
    e.preventDefault()

    axiosApiInstance.post('http://localhost:3000/api/v1/posts', { post: post })
      .then( resp => {
        setPost({user_id: currentUser.id})
        setPosts([...posts, resp.data.data])
      })
      .catch( resp => console.log(resp))
  }

  const handleChange = e => {
    setPost({...post, [e.target.name]:e.target.value})
    console.log(post);
  }

  return (
    <Wrapper>
      <div>[This is the Feed component]</div>
      <NewPost currentUser={currentUser}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        post={post}
      />
      <Posts searchFriends={true} posts={posts} />
    </Wrapper>
  )
}

export default Feed
