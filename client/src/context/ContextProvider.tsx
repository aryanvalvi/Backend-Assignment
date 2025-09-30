"use client"
import {createContext, useContext, useEffect, useReducer} from "react"

const initialState = {
  user: null,
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_USER":
      return {...state, user: action.payload}
    case "LOGOUT":
      return {...state, user: null}
    default:
      return state
  }
}

const UserContext = createContext<any>(undefined)

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:5001/checkUser", {
          method: "GET",
          credentials: "include",
        })
        const data = await res.json()
        if (data.user) {
          dispatch({type: "SET_USER", payload: data.user.data})
        }
      } catch (error) {
        console.log("Not logged in")
      }
    }
    getUser()
  }, [])
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}

export const useAppContext = () => useContext(UserContext)
