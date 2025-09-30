"use client"
import {useAppContext} from "@/context/ContextProvider"
import React, {useEffect, useState} from "react"

const PostList = () => {
  const [posts, setPosts] = useState<any>(null)
  const {toggle} = useAppContext()
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Backed_Url}/getpost`,
          {
            method: "GET",
            credentials: "include",
          }
        )
        const data = await res.json()
        setPosts(data.post)
      } catch (error) {}
    }
    getUser()
  }, [toggle])

  return (
    <div className="space-y-4">
      {posts?.map((post: any) => (
        <div key={post._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {post.author.name}
              </h3>
              <p className="text-[14px]">{post.author.email}</p>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export default PostList
