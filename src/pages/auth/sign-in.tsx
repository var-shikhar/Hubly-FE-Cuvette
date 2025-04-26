import { Link } from "react-router-dom"
import AuthWrapper from "../../components/auth-wrapper"
import Button from "../../components/button"
import FormGenerator from "../../components/form-generator"
import useSignIn from "../../hooks/auth/use-sign-in"

const SignIn = () => {
  const { SIGN_IN_FORM_ELEMENTS, formErrors, handleSubmit } = useSignIn()
  return (
    // Common Auth Wrapper for all pages (Auth Once Only)
    <AuthWrapper title="Sign IN">
      {/* Form using Dynamic Form Generator */}
      <form onSubmit={handleSubmit}>
        {SIGN_IN_FORM_ELEMENTS?.map((item) => (
          <FormGenerator
            key={item.name}
            inputType={item.inputType}
            type={item.type}
            label={item.label}
            checkboxLabel={item.checkboxLabel}
            placeholder={item.placeholder}
            name={item.name}
            onUpdate={item.onUpdate}
            error={item.error}
            validation={item.validation}
          />
        ))}
        <Button
          type="submit"
          color="primary"
          size="md"
          className="w-100"
          disabled={Object.keys(formErrors).length > 0}
        >
          Log in
        </Button>
      </form>
      <div className="text-secondary text-xs my-2">
        <Link className="text-secondary" to="#">
          Forgot password?
        </Link>
      </div>
      <div className="text-secondary text-xs my-2">
        Don’t have an account?{" "}
        <Link className="text-secondary" to="../auth/sign-up">
          Sign up
        </Link>
      </div>
    </AuthWrapper>
  )
}

export default SignIn
