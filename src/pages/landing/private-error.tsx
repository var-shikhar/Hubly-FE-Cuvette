import { Link } from "react-router-dom"
import Button from "../../components/button"

const PrivateError = () => {
  return (
    <div className="error-page">
      <h1 className="landing_heading">403 - Access Denied</h1>
      <div className="landing_paragraph">
        You don’t have permission to view this page.
      </div>
      <Link to="/app">
        <Button type="button">Go to Dashboard</Button>
      </Link>
    </div>
  )
}

export default PrivateError
