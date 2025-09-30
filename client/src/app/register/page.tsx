"use client"
import {useAppContext} from "@/context/ContextProvider"

import {useRouter} from "next/navigation"
import React, {useState} from "react"

const Page = () => {
  const {dispatch, state} = useAppContext()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [userdata, setUserdata] = useState<any>({
    email: "",
    password: "",
  })
  const [success, setSuccess] = useState<any>(false)
  const [respnse, setrespnse] = useState("")
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserdata((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_Backed_Url}/register`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userdata.email,
        password: userdata.password,
        admin: isAdmin,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      setSuccess(true)

      dispatch({type: "SET_USER", payload: data})
      setTimeout(() => {
        router.push("/")
      }, 600)
    } else {
      setSuccess(false)
    }
    setrespnse(data.message)
  }

  return (
    <div className="h-[100vh]">
      <div className="h-full flex items-center justify-center flex-col">
        <h1 className="text-[20px] font-extrabold">Register page</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 w-300 rounded-lg shadow-md mb-6 max-w-md mx-auto  "
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3  border-b-2 rounded-md focus:outline-none  focus:ring-neutral-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border-b-2  rounded-md focus:outline-none  focus:ring-neutral-700"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-orange-700  text-sm">
              For Role based Authentication demonstration purpose, do you want
              to create account as admin?
            </span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <div
                className={`w-12 h-6 bg-gray-300 rounded-full transition-colors ${
                  isAdmin ? "bg-orange-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  isAdmin ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </label>
          </div>
          {!success ? (
            <h1 className="text-red-600 mt-10 text-center text-lg mb-4">
              {respnse}
            </h1>
          ) : (
            <h1 className="text-green-600 font-semibold text-center text-lg mb-4">
              {respnse}
            </h1>
          )}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Register
          </button>
        </form>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-orange-500 font-semibold">
          For demonstration purpose, do you want to create account as admin?
        </span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <div
            className={`w-12 h-6 bg-gray-300 rounded-full transition-colors ${
              isAdmin ? "bg-orange-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              isAdmin ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </label>
      </div>
    </div>
  )
}

export default Page
