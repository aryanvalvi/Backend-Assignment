"use client"
import {useAppContext} from "@/context/ContextProvider"
import {useRouter} from "next/navigation"

import React, {useEffect, useState} from "react"

const Page = () => {
  const router = useRouter()
  const {state} = useAppContext()

  const [data, setData] = useState<{user: any; posts: any[]} | null>(null)

  const [editToggle, setEditToggle] = useState(false)
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState("")

  const handleSaveEdit = async (postId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_Backed_Url}/createpost/${postId}`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          credentials: "include",
          body: JSON.stringify({content: editForm}),
        }
      )
      if (res.ok) {
        setData((prev: any) => ({
          ...prev,
          posts: prev!.posts.map((post: any) =>
            post._id === postId ? {...post, content: editForm} : post
          ),
        }))
        setEditToggle(false)
        setEditingPostId(null)
        setEditForm("")
      } else {
      }
    } catch (error) {}
  }

  const handleDelete = async (postId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_Backed_Url}/createpost/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
      if (res.ok) {
        setData((prev: any) => ({
          ...prev,
          posts: prev!.posts.filter((post: any) => post._id !== postId),
        }))
      } else {
      }
    } catch (error) {}
  }
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Backed_Url}/profile`,
          {
            method: "GET",
            credentials: "include",
          }
        )

        if (!res.ok) {
          // setIsLoading(false)
          router.push("/login")
          return
        }
        const data = await res.json()
        setData(data) // Store the fetched data in state
        setEditForm(data?.posts.map((e: any) => e.content))
      } catch (error) {}
    }
    getdata()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
        {data ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                User Info
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {data.user?.email}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium">ID:</span> {data.user?._id}
                </p>
              </div>
            </div>

            {editToggle ? (
              <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Posts
                </h2>
                <div className="space-y-4">
                  {data.posts.map(post => (
                    <div
                      key={post._id}
                      className="p-4 border rounded-md bg-gray-50"
                    >
                      <p className="text-gray-800">
                        <span className="font-medium">Content:</span>{" "}
                        <input
                          onChange={e => setEditForm(e.target.value)}
                          type="text"
                          value={editForm}
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-500 mt-1"
                        />
                        {/* {post.content} */}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Author ID:</span>{" "}
                        {post.author}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <span className="font-medium">Created:</span>{" "}
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <span className="font-medium">Updated:</span>{" "}
                        {new Date(post.updatedAt).toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <span className="font-medium">Post ID:</span> {post._id}
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => handleSaveEdit(post._id)}
                          className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditToggle(false)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Posts
                </h2>
                <div className="space-y-4">
                  {data.posts.map(post => (
                    <div
                      key={post._id}
                      className="p-4 border rounded-md bg-gray-50"
                    >
                      <p className="text-gray-800">
                        <span className="font-medium">Content:</span>{" "}
                        {post.content}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Author ID:</span>{" "}
                        {post.author}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <span className="font-medium">Created:</span>{" "}
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <span className="font-medium">Updated:</span>{" "}
                        {new Date(post.updatedAt).toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <span className="font-medium">Post ID:</span> {post._id}
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingPostId(post._id)
                            setEditForm(post.content)
                            setEditToggle(true)
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-600 text-center">Loading profile...</p>
        )}
      </div>
    </div>
  )
}

export default Page
