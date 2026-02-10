import "antd/dist/reset.css"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./App.tsx"
import AntdTheme from "./components/antd-theme/index.tsx"
import { TanstackQuery } from "./components/tanstack-query/index.tsx"
import "./styles/global.css"

const root = createRoot(document.getElementById("root")!)

const loading = document.getElementById("app-loading")
if (loading) loading.remove()

root.render(
  <BrowserRouter>
    <AntdTheme>
      <TanstackQuery>
        <App />
      </TanstackQuery>
    </AntdTheme>
  </BrowserRouter>
)
