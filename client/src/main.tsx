import { GoogleOAuthProvider } from "@react-oauth/google"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="190911477101-sh5v6l56594rc51ibk63ppb3d697pfrh.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
