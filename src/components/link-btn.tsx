import { Link } from "react-router-dom"
import Button from "./button"
import "./css/link-button.css"

const LinkButton = ({
  redirectTo = "../auth/sign-up",
  text = "Sign up free",
  color = "primary",
  className = "",
  isLight = false,
}: {
  redirectTo?: string
  text?: string
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "none"
  className?: string
  isLight?: boolean
}) => {
  return (
    <Link to={redirectTo} className="link-button">
      <Button
        type="button"
        color={color}
        className={className}
        variant={isLight ? "outline" : "default"}
      >
        {text}
      </Button>
    </Link>
  )
}

export default LinkButton
