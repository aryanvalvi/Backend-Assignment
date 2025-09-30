"use client"

import {useAppContext} from "@/context/ContextProvider"
import Navbar from "../components/Navbar"
import PostForm from "@/components/Post"
import PostList from "@/components/PostList"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Post </h1>

      <PostForm />
      <PostList />
    </div>
  )
}
