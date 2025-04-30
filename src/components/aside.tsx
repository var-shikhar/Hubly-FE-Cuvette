/*
|--------------------------------------------------------------------------- 
| Aside Component
|--------------------------------------------------------------------------- 
| A responsive sidebar component that adapts to mobile and desktop views. 
| The sidebar displays navigation links with icons and titles, which are 
| dynamically generated from the `ASIDE_LIST` array. The navigation changes 
| based on whether the screen size is mobile or desktop. On mobile, a fixed 
| header with a user profile icon and a bottom navigation bar is shown, 
| while on desktop, a vertical navigation bar is displayed. The component 
| also includes a user sign-out feature triggered by the user profile icon. 
| The component uses `useDispatch` to handle user logout by dispatching the 
| `logoutUser` action from Redux. 
*/

import clsx from "clsx"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import CHAT_BOT_SVG from "../assets/chatbot.svg"
import HOME_SVG from "../assets/home.svg"
import MESSAGE_SVG from "../assets/message.svg"
import PROFILE_SVG from "../assets/profile.svg"
import ANALYTICS_SVG from "../assets/ranking.svg"
import SETTINGS_SVG from "../assets/settings.svg"
import TEAM_SVG from "../assets/team.svg"
import { logoutUser } from "../redux/slice/user-slice"
import { AppDispatch } from "../redux/store"
import "./css/aside.css"
import LogoWrapper from "./logo-wrapper"

// Aside List
const ASIDE_LIST = [
  {
    id: 1,
    title: "Dashboard",
    navigationURL: "dashboard",
    icon: HOME_SVG,
  },
  {
    id: 2,
    title: "Contact",
    navigationURL: "chat",
    icon: MESSAGE_SVG,
  },
  {
    id: 3,
    title: "Analytics",
    navigationURL: "analytics",
    icon: ANALYTICS_SVG,
  },
  {
    id: 4,
    title: "Chat Bot",
    navigationURL: "chat-bot-settings",
    icon: CHAT_BOT_SVG,
  },
  {
    id: 5,
    title: "Team",
    navigationURL: "teams",
    icon: TEAM_SVG,
  },
  {
    id: 6,
    title: "Setting",
    navigationURL: "settings",
    icon: SETTINGS_SVG,
  },
]

const Aside = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Set the initial state based on the window width
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    setIsMobile(mediaQuery.matches)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Handle User Logout Dispatch Function
  const handleDelete = useCallback(() => {
    dispatch(logoutUser())
  }, [])

  // Handle Mobile View
  if (isMobile) {
    return (
      <>
        {/* Mobile Header (Fixed at Top) */}
        <div className="mobile-header">
          <LogoWrapper hasTitle={false} />
          <div className="user-wrapper">
            <div className="mobile-user">
              <img src={PROFILE_SVG} alt="User" width={25} />
            </div>
            <div className="user-popup-content" onClick={handleDelete}>
              Signout
            </div>
          </div>
        </div>

        {/* Bottom Navigation (Fixed at Bottom) */}
        <nav className="mobile-bottom-nav">
          {ASIDE_LIST.map((item) => (
            <NavLink
              key={item.id}
              to={`./${item.navigationURL}`}
              className={({ isActive }) =>
                clsx("mobile-nav-link", {
                  "active-link": isActive,
                })
              }
              end
            >
              {({ isActive }) => (
                <>
                  <img
                    src={item.icon}
                    alt={item.title}
                    width={25}
                    className="nav-icon"
                  />
                  {isActive && <div className="nav-title">{item.title}</div>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </>
    )
  }

  return (
    <>
      <div>
        {/* Header */}
        <LogoWrapper hasTitle={false} />

        {/* Navigation */}
        <nav className="navigation-wrapper">
          {ASIDE_LIST.map((item) => (
            <NavLink
              key={item.id}
              to={`./${item.navigationURL}`}
              className={({ isActive }) =>
                clsx("nav-link", {
                  "active-link": isActive,
                })
              }
              end
            >
              {({ isActive }) => (
                <>
                  <img
                    src={item.icon}
                    alt={item.title}
                    width={25}
                    className="nav-icon"
                  />
                  {isActive && <div className="nav-title">{item.title}</div>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="aside-footer">
        <div className="user-popup-trigger">
          <img src={PROFILE_SVG} alt="user" width={25} />
        </div>

        <div className="user-popup-content" onClick={handleDelete}>
          Sign Out
        </div>
      </div>
    </>
  )
}

export default Aside
