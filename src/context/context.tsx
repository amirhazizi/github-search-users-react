import React, { useState, useEffect, useContext } from "react"
import mockUser from "./mockData.ts/mockUser"
import mockRepos from "./mockData.ts/mockRepos"
import mockFollowers from "./mockData.ts/mockFollowers"
import axios from "axios"

const rootUrl = "https://api.github.com"
type PropType = {
  children: React.ReactNode
}
type GithubContextType = {
  githubUser: object
  repos: object[]
  followers: object[]
}
const GithubContext = React.createContext<GithubContextType | null>(null)
const GithubProvider = ({ children }: PropType) => {
  const [githubUser, setGuthubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers }}>
      {children}
    </GithubContext.Provider>
  )
}
const useGlobalGithubContext = () => {
  return useContext(GithubContext)
}
export { GithubContext, GithubProvider, useGlobalGithubContext }
