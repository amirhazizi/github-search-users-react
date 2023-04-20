import React, { useState, useEffect, useContext } from "react"
import mockUser from "./mockData.tsx/mockUser"
import mockRepos from "./mockData.tsx/mockRepos"
import mockFollowers from "./mockData.tsx/mockFollowers"
import axios from "axios"

const rootUrl = "https://api.github.com"
const GithubContext = React.createContext()
type Proptype = {
  children: React.ReactNode
}
const GithubProvider = ({ children }: Proptype) => {
  return (
    <GithubContext.Provider value={"haloo"}>{children}</GithubContext.Provider>
  )
}
const useGlobalGithubContext = () => {
  return useContext(GithubContext)
}
export { GithubContext, GithubProvider, useGlobalGithubContext }
