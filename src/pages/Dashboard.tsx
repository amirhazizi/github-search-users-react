import React from "react"
import { Info, Repos, User, Search, Navbar } from "../components"
import loadingImage from "../images/preloader.gif"
import { useGlobalGithubContext } from "../context/context"
const Dashboard = () => {
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )
}

export default Dashboard
