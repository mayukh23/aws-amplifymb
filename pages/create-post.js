import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { createPost } from "../src/graphql/mutations";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"),{
    ssr: false
});
//import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"


const initialState = { title: "", content: "" };

function CreatePost() {
  const [post, setPost] = useState(initialState);
  const { title, content } = post;
  const router = useRouter();

  function onChange(e) {
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  }

  async function createNewPost() {
    if (!title || !content) return;
    const id = uuid();
    post.id = id;

    await API.graphql({
      query: createPost,
      variables: { input: post },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    router.push(`/posts/${id}`);
  }

  return (
      <div>
          <h1 className="text-3xl font-semibold tracking-wide mt-6">Create New Post</h1>
          <input 
            onChange={onChange}
            name="title"
            placeholder="Title"
            value={post.title}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />

          <SimpleMDE
            value={post.content}
            onChange={(value) => setPost({...post, content: value})} 
          />
          <button type="button"
          className="mb-4 bg-blue-600 text-white 
          font-semibold px-8 py-2 rounded-lg"
          onClick={createNewPost}
          >Create Post</button>
      </div>
  )
}

export default withAuthenticator(CreatePost);
