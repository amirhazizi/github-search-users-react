import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

type PrivateRouteProps = {
  children: React.ReactNode
}
const PrivateRoute = ({ children }: PrivateRouteProps): any => {
  const { isAuthenticated, user } = useAuth0()
  const isUser = isAuthenticated && user

  return user ? (
    children
  ) : (
    <>
      <Navigate to='/login' />
    </>
  )
}
export default PrivateRoute
