"use client"
import {useRouter} from "next/navigation"
import React, {useEffect, useState} from "react"

const page = () => {
  const router = useRouter()
  const [data, setData] = useState<any>([])

  const handleDelete = async (postId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_Backed_Url}/deletePost/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
      const data = await res.json()
      if (res.ok) {
        setData((prev: any) => prev.filter((post: any) => post._id != postId))
      } else {
      }
    } catch (error) {}
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Backed_Url}/admin`, {
          method: "GET",
          credentials: "include",
        })
        const data = await res.json()

        setData(data.allPost)
      } catch (error) {}
    }
    getData()
  }, [])
  useEffect(() => {
    const isAdmin = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Backed_Url}/isadmin`,
          {
            method: "GET",
            credentials: "include",
          }
        )
        if (!res.ok) {
          alert("Yout are not authorized for admin console")
          router.push("/")
        }

        const data = await res.json()
      } catch (error) {}
    }
    isAdmin()
  }, [])

  return (
    <div>
      {data ? (
        <div className="bg-white p-6 rounded-lg shadow-md   mx-auto h-[100vh]">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 ">Posts</h2>
          <div className="gap-10 flex flex-wrap  justify-center items-center overflow-x-auto">
            {data.map((post: any) => (
              <div
                key={post._id}
                className="p-4 border rounded-md bg-gray-50   w-70 h-70 relative"
              >
                <p className="text-gray-600 flex items-center ">
                  <span className="font-extrabold">Email:</span>
                  <p className="text-sm">{post.author?.email}</p>
                </p>
                <p className="text-gray-600 mt-1 flex items-center ">
                  <span className="font-extrabold">ID:</span>
                  <p className="text-sm">{post.author?._id}</p>
                </p>
                <p className="text-gray-600 mt-1 flex mb-2 ">
                  <span className="font-extrabold">Content:</span>
                  <p className="text-sm">{post.content}</p>
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
                <div className="mt-2 right-1 absolute bottom-1 flex space-x-2">
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
      ) : (
        <>Loading...</>
      )}
    </div>
  )
}

export default page
