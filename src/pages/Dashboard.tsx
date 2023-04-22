import React from "react"
import { Info, Repos, User, Search, Navbar } from "../components"
import loadingImage from "../images/preloader.gif"
import { useGlobalGithubContext } from "../context/context"
type GlobalContextProps = {
  isLoading: boolean
}
const Dashboard = () => {
  const { isLoading } = useGlobalGithubContext() as GlobalContextProps
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img className='loading-img' src={loadingImage} alt='loading-image' />
      </main>
    )
  }
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
