import useMemberForm from "../../hooks/team/use-member-form"
import Button from "../button"
import FormGenerator from "../form-generator"

type Props = {
  handleConfirmation: () => void
}

const MemberForm = ({ handleConfirmation }: Props) => {
  const { MEMBER_FORM_ELEMENTS, formErrors, handleSubmission, isLoading } =
    useMemberForm({ confirmFn: handleConfirmation })
  return (
    <div>
      <div className="text-secondary text-sm my-2">
        Talk with colleagues in a group chat. Messages in this group are only
        visible to it's participants. New teammates may only be invited by the
        administrators.
      </div>
      <form onSubmit={handleSubmission}>
        {MEMBER_FORM_ELEMENTS?.map((item) => (
          <FormGenerator
            key={item.name}
            inputType={item.inputType}
            type={item.type}
            label={item.label}
            checkboxLabel={item.checkboxLabel}
            placeholder={item.placeholder}
            options={item.options}
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
          disabled={isLoading || Object.keys(formErrors).length > 0}
        >
          Create New Member
        </Button>
      </form>
    </div>
  )
}

export default MemberForm
