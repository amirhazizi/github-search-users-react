import React, { useState, useEffect, useContext } from "react"
import mockUser from "./mockData.ts/mockUser"
import mockRepos from "./mockData.ts/mockRepos"
import mockFollowers from "./mockData.ts/mockFollowers"
import axios from "axios"
const rootUrl = "https://api.github.com"
const autoFetch = axios.create({
  baseURL: rootUrl,
  headers: { Accept: "application/json" },
})
type PropType = {
  children: React.ReactNode
}
type GithubContextType = {
  githubUser: object
  repos: object[]
  followers: object[]
  requests: number
}
const GithubContext = React.createContext<GithubContextType | null>(null)
const GithubProvider = ({ children }: PropType) => {
  const [githubUser, setGuthubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const checkRequests = async () => {
    const {
      data: {
        rate: { limit, remaining, reset },
      },
    } = await autoFetch("/rate_limit")
    setRequests(remaining)
    if (!remaining) {
      //error
    }
  }

  useEffect(() => {
    checkRequests()
  }, [])
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, requests }}>
      {children}
    </GithubContext.Provider>
  )
}
const useGlobalGithubContext = () => {
  return useContext(GithubContext)
}
export { GithubContext, GithubProvider, useGlobalGithubContext }
