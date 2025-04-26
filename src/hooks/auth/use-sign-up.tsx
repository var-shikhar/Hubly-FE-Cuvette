import { FormEvent, useState } from "react"
import { FormGeneratorProps } from "../../components/form-generator"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { signupUser } from "../../redux/slice/user-slice"
import { showToast } from "../../lib/utils"

type TSignupForm = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  termsAndConditions: boolean
}

const useSignUP = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState<TSignupForm>({} as TSignupForm)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    firstName: "First Name is required",
    lastName: "Last Name is required",
    email: "Email is required",
    password: "Password is required",
    confirmPassword: "Confirm Password is required",
    termsAndConditions: "Terms and Conditions is required",
  })

  const handleUpdate = (
    name: string,
    value: string | boolean | string[] | null,
    error: string | null
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Store error only if it exists, otherwise remove it
    setFormErrors((prev) => {
      const updatedErrors = { ...prev }
      if (error) updatedErrors[name] = error
      else delete updatedErrors[name]
      return updatedErrors
    })
  }

  // Form Elements for Sign Up Form (using Dynamic Form Generator)
  const SIGN_UP_FORM_ELEMENTS: FormGeneratorProps[] = [
    {
      inputType: "input",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      name: "firstName",
      error: formErrors.firstName,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
        pattern: /^[a-zA-Z\s]+$/,
        errorMessage: "Only Alphabets are allowed",
      },
    },
    {
      inputType: "input",
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      name: "lastName",
      error: formErrors.lastName,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
        pattern: /^[a-zA-Z\s]+$/,
        errorMessage: "Only Alphabets are allowed",
      },
    },
    {
      inputType: "input",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      name: "email",
      error: formErrors.email,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },
    {
      inputType: "input",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      name: "password",
      error: formErrors.password,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        minLength: 6,
        maxLength: 20,
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        errorMessage:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    {
      inputType: "input",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      name: "confirmPassword",
      error: formErrors.confirmPassword,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        minLength: 6,
        maxLength: 20,
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        errorMessage:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        validate: (value) => {
          if (value !== formData.password) return "Passwords do not match."
          return null
        },
      },
    },
    {
      inputType: "checkbox",
      type: "checkbox",
      checkboxLabel: (
        <div>
          By creating an account, I agree to our{" "}
          <Link className="text-secondary" to={"../terms-condition"}>
            Terms of use
          </Link>{" "}
          and{" "}
          <Link className="text-secondary" to={"../privacy-policy"}>
            Privacy Policy
          </Link>
        </div>
      ),
      name: "termsAndConditions",
      error: formErrors.termsAndConditions,
      onUpdate: handleUpdate,
      validation: {
        required: true,
      },
    },
  ] as const

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      if (Object.keys(formErrors).length > 0) {
        console.log("Form has errors:", formErrors)
        return
      }

      // Dispatch the signup request using RTK Query
      await dispatch(
        signupUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
      ).unwrap()

      showToast("Signup successful, Redirecting!!!", "success")
      navigate("/auth/sign-in")
    } catch (error) {
      console.error(error)
    }
  }

  return {
    SIGN_UP_FORM_ELEMENTS,
    formData,
    formErrors,
    handleUpdate,
    handleSubmit,
  }
}

export default useSignUP
