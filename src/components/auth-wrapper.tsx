/*
|--------------------------------------------------------------------------- 
| AuthWrapper Component
|--------------------------------------------------------------------------- 
| A common wrapper component used for both the Signup and Signin pages. 
| It provides a consistent layout that includes a title, optional side link 
| for navigation (e.g., "Forgot Password" or "Create an Account"). 
*/

import { ReactNode } from "react"
import { Link } from "react-router-dom"
import FRAME from "../assets/Frame.png"
import "./css/authWrapper.css"
import LogoWrapper from "./logo-wrapper"

type Props = {
  title: string
  children: ReactNode
  sideLink?: string
  sideText?: string
  hasbottomLine?: boolean
}

const AuthWrapper = ({
  title,
  children,
  sideLink,
  sideText,
  hasbottomLine = true,
}: Props) => {
  return (
    <div className="auth-container overflow-x-hidden bg-white vh-100 vw-100">
      <div className="auth-wrapper">
        <LogoWrapper />
        <div className="form-wrapper hidden-scrollbar">
          <div className="auth-title">
            <div className="m-0 h3">{title}</div>
            {sideLink && (
              <Link
                to={`../auth/${sideLink}`}
                className="text-secondary text-xs"
              >
                {sideText}
              </Link>
            )}
          </div>
          <div>{children}</div>
        </div>
        {hasbottomLine && (
          <div className="text-secondary text-center text-xs mb-2">
            This site is protected by reCAPTCHA and the{" "}
            <Link className="text-secondary" to={"../"}>
              Google Privacy Policy
            </Link>{" "}
            and
            <Link className="text-secondary" to={"../terms-condition"}>
              Terms of Service
            </Link>{" "}
            apply.
          </div>
        )}
      </div>
      <div className="auth-image right">
        <img alt="auth-wrapper" src={FRAME} />
      </div>
    </div>
  )
}

export default AuthWrapper
