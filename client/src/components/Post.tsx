"use client"

import {useAppContext} from "@/context/ContextProvider"
import {useRouter} from "next/navigation"
import React, {useEffect, useState} from "react"

const PostForm = () => {
  const router = useRouter()
  const {state, dispatch} = useAppContext()

  const [text, setText] = useState("")

  const handleSubmit = async (e: any) => {
    if (!state.user) {
      alert("Please login to Post")
      router.push("/login")
    }
    e.preventDefault()
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_Backed_Url}/createpost`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({text}),
        }
      )
      const data = await res.json()
      console.log(data)
      if (res.ok) {
        router.refresh()
        setText("")
      }
    } catch (error) {
      console.error("Error posting:", error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <textarea
        value={text}
        onChange={(e: any) => setText(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-500"
        rows={4}
      />
      <button
        type="submit"
        className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-orange-300"
      >
        Post
      </button>
    </form>
  )
}

export default PostForm
