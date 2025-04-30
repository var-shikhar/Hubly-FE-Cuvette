// Common Layout Wrapper for all the Private Pages

import { Outlet } from "react-router-dom"
import Aside from "../../components/aside"
import "../../components/css/layout.css"
import { useLocation } from "react-router-dom"

const DashboardLayout = () => {
  const location = useLocation()
  const isChatRoute = /^\/app\/chat(\/\w+)?$/.test(location.pathname)

  return (
    <div className={`layout-wrapper`}>
      <aside className="aside-wrapper">
        <Aside />
      </aside>
      <main
        className={`main-wrapper hidden-scrollbar ${
          isChatRoute ? "padding-0" : ""
        }`}
      >
        <Outlet />
        <div className="private-footer" />
      </main>
    </div>
  )
}

export default DashboardLayout
