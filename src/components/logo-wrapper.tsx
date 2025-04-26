import { Link } from "react-router-dom"
import LOGO from "../assets/logo.svg"
import "./css/logo-wrapper.css"

type props = {
  hasTitle?: boolean
}

const LogoWrapper = ({ hasTitle = true }: props) => {
  return (
    <Link to={"/"} className="logo-link">
      <div className="logo-wrapper">
        <img src={LOGO} alt="HUBLY" width={45} />
        {hasTitle && <span>Hubly</span>}
      </div>
    </Link>
  )
}

export default LogoWrapper
