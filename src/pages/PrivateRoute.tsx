import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

type PrivateRouteProps = {
  children: React.ReactNode
  user: {}
}
const PrivateRoute = ({ children, user }: PrivateRouteProps) => {
  return user ? children : <Navigate to='/login' />
}
export default PrivateRoute
