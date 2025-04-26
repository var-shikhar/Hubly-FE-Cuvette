import LinkButton from "../components/link-btn"
import Button from "./button"
import "./css/header.css"
import LogoWrapper from "./logo-wrapper"

type Props = {
  title: string
  description?: string
  button?: {
    title: string
    handleClick: () => void
  }
}

const Header = ({ description, title, button }: Props) => {
  return (
    <div className="header-wrapper">
      <div className="header-content">
        <h3>{title}</h3>
        {description && <div className="text-secondary">{description}</div>}
      </div>
      {button && (
        <span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-w-max-content"
            onClick={button.handleClick}
          >
            {button.title}
          </Button>
        </span>
      )}
    </div>
  )
}
export default Header

export const PublicHeader = () => {
  return (
    <div className="landing_header-wrapper landing_margin">
      <div className="landing_header-content">
        <LogoWrapper />
        <div className="landing_header-buttons">
          <LinkButton text="Login" redirectTo="/auth/sign-in" isLight />
          <span className="landing_header-signup-btn">
            <LinkButton />
          </span>
        </div>
      </div>
    </div>
  )
}
