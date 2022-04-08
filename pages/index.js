import { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { listPosts } from '../src/graphql/queries'


export default function Home() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts
    })
    setPosts(postData.data.listPosts.items)
    //console.log(postData.data.listPosts.items)
  }

  useEffect(() => {
    fetchPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
      <div>
        <h1 className="text-slate-500 text-3xl font-bold underline">
         My Posts
        </h1>
        {posts.map((post,index) => (   
          <p key={index}>{post.title}</p>
        ))}
      </div>
  )
}
