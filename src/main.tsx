import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"

import { GithubProvider } from "./context/context"
import { Auth0Provider } from "@auth0/auth0-react"
const domainURL = import.meta.env.VITE_AUTH0_DOMAIN
const clientID = import.meta.env.VITE_AUTH0_CLIENTID
const root = ReactDOM.createRoot(document.getElementById("root") as Element)

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={`${domainURL}`}
      clientId={`${clientID}`}
      authorizationParams={{ redirectUri: window.location.origin }}
      cacheLocation='localstorage'
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
)
