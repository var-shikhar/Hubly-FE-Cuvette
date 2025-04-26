import { FormEvent, useState } from "react"
import { FormGeneratorProps } from "../../components/form-generator"
import { showToast } from "../../lib/utils"
import {
  TMemberForm,
  useAddMemberMutation,
} from "../../redux/slice/member-slice"

const useMemberForm = ({ confirmFn }: { confirmFn: () => void }) => {
  const [createFunction, { isLoading }] = useAddMemberMutation()
  const [formData, setFormData] = useState<TMemberForm>({} as TMemberForm)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    name: "Name is required",
    email: "Email is required",
    designation: "Designation is required",
  })

  // Handle Form State sUpdate
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

  // Form Elements for Sign In Form (using Dynamic Form Generator)
  const MEMBER_FORM_ELEMENTS: FormGeneratorProps[] = [
    {
      inputType: "input",
      type: "text",
      label: "Name",
      placeholder: "John Doe",
      name: "name",
      error: formErrors.name,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 50,
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
      inputType: "select",
      type: "text",
      label: "Designation",
      placeholder: "Select ...",
      name: "designation",
      error: formErrors.designation,
      onUpdate: handleUpdate,
      options: [
        { id: "1", value: "Admin", label: "Admin" },
        { id: "2", value: "Member", label: "Member" },
      ],
      validation: {
        required: true,
      },
    },
  ] as const

  // Handle Create
  async function handleSubmission(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      if (Object.keys(formErrors).length > 0) {
        console.log("Form has errors:", formErrors)
        return
      }
      await createFunction({
        name: formData.name,
        email: formData.email,
        designation: formData.designation,
      }).unwrap()
      showToast("Member created successfully", "success")
      showToast("Default Password is User@1234", "success")
    } catch (error) {
      console.error("Error creating member:", error)
    } finally {
      confirmFn()
    }
  }

  return {
    MEMBER_FORM_ELEMENTS,
    handleSubmission,
    formErrors,
    isLoading,
  }
}

export default useMemberForm
