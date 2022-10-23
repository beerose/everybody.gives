import { LabeledFieldWithAddOn } from "app/core/components/LabeledFieldWithAddOn"
import LabeledTextareaField from "app/core/components/LabeledTextareaField"
import LabeledTextField from "app/core/components/LabeledTextField"
import { useForm } from "react-final-form"

export const NewGroupBasicFields = () => {
  const form = useForm()

  return (
    <>
      <h1 className="text-5xl font-black tracking-tight text-gray-700 text-center">New group</h1>
      <LabeledFieldWithAddOn
        addOn="everybody.gives/"
        name="name"
        label="Group Name"
        placeholder="my-party-2022"
      />
      <LabeledTextField
        name="createdBy"
        label="Your Name"
        placeholder="Alex"
        onChangeHook={(value) => {
          form.change("members", [{ name: value }])
        }}
      />
      <LabeledTextField
        name="password"
        label="Group's Password"
        placeholder="Password"
        type="password"
      />
      <LabeledTextField name="eventName" label="Event name" placeholder="Christmas Eve 2022" />
      <LabeledTextareaField
        name="description"
        label="Description"
        placeholder={`Christmas Eve 2022
24/12/2022, Wroclaw, 5pm`}
        optional
      />
    </>
  )
}
