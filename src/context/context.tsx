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
  limit: number
  isError: object
  searchGithubUser: Function
  isLoading: boolean
  setIsLoading: Function
}

const GithubContext = React.createContext<GithubContextType | null>(null)
const GithubProvider = ({ children }: PropType) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [requests, setRequests] = useState(0)
  const [limit, setLimit] = useState(0)
  const [isError, setIsError] = useState({ show: false, msg: "" })
  const [isLoading, setIsLoading] = useState(false)

  const searchGithubUser = async (user: string) => {
    toggleError()
    setIsLoading(true)
    try {
      const userRes: { data: any; login: string; followers_url: string } =
        await autoFetch(`/users/${user}`)
      if (userRes) {
        setGithubUser(userRes.data)
        const { login, followers_url } = userRes.data
        await Promise.allSettled([
          autoFetch(`/users/${login}/repos?per_page=100`),
          autoFetch(`${followers_url}?per_page=100`),
        ])
          .then((results) => {
            const [repos, followers] = results
            const status = "fulfilled"

            if (repos.status == status) {
              setRepos(repos.value.data)
            }

            if (followers.status == status) {
              setFollowers(followers.value.data)
            }
          })
          .catch((error) => console.log(error))
      }
      setIsLoading(false)
    } catch (error: any) {
      console.log(error.response)
      if (error.response.data.message === "Not Found") {
        toggleError(true, "there is no user with that username")
      }
      setIsLoading(false)
    }
    setRequests((prevReq) => {
      if (prevReq <= 0) return 0
      return prevReq - 1
    })
  }
  const checkRequests = async () => {
    try {
      const {
        data: {
          rate: { limit, remaining, reset },
        },
      } = await autoFetch("/rate_limit")
      setRequests(remaining)
      setLimit(limit)
      if (!remaining) {
        toggleError(true, "sorry, toy have exceeded your hourly rate limit!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkRequests()
  }, [])
  const toggleError = (show: boolean = false, msg: string = "") => {
    setIsError({ show, msg })
  }
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        limit,
        isError,
        searchGithubUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
const useGlobalGithubContext = () => {
  return useContext(GithubContext)
}
export { GithubContext, GithubProvider, useGlobalGithubContext }
