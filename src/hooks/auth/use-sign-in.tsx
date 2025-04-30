/**
 * useSignIn – Custom hook to handle sign-in form logic.
 *
 * - Manages form state and validation.
 * - Dispatches login action via Redux.
 * - Shows toast on success and redirects.
 * - Designed for use with dynamic FormGenerator.
 */

import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FormGeneratorProps } from "../../components/form-generator"
import { showToast } from "../../lib/utils"
import { loginUser } from "../../redux/slice/user-slice"
import { AppDispatch } from "../../redux/store"

type TSingInForm = {
  email: string
  password: string
}

const useSignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState<TSingInForm>({} as TSingInForm)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    email: "Email is required",
    password: "Password is required",
  })

  // Handle (Setup) Form Value and Errors
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

  // Handle Sign-In Form Submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      if (Object.keys(formErrors).length > 0) {
        console.log("Form has errors:", formErrors)
        return
      }

      // Dispatch the login request using RTK Query
      await dispatch(
        loginUser({ email: formData.email, password: formData.password })
      ).unwrap()

      showToast("Login successful, Redirecting!!!", "success")
      navigate("/app")
    } catch (error) {
      console.log(error)
    }
  }

  // Form Elements for Sign In Form (using Dynamic Form Generator)
  const SIGN_IN_FORM_ELEMENTS: FormGeneratorProps[] = [
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
      placeholder: "********",
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
  ] as const

  return {
    SIGN_IN_FORM_ELEMENTS,
    formData,
    formErrors,
    handleSubmit,
  }
}

export default useSignIn
