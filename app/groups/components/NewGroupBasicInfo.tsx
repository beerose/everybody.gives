import { useMutation } from "@blitzjs/rpc"
import { GiftIcon } from "@heroicons/react/solid"
import { LabeledFieldWithAddOn } from "app/core/components/LabeledFieldWithAddOn"
import LabeledTextareaField from "app/core/components/LabeledTextareaField"
import LabeledTextField from "app/core/components/LabeledTextField"
import { useForm } from "react-final-form"
import validateGroupName from "../mutations/validateGroupName"

export const NewGroupBasicFields = () => {
  const [validateGroupNameMutation] = useMutation(validateGroupName)
  const form = useForm()

  return (
    <>
      <div className="text-center">
        <GiftIcon className="mx-auto h-20 w-20 text-gray-400" />
        <h1 className="mt-1 text-5xl font-black tracking-tight text-gray-700 text-center">
          New Group
        </h1>
      </div>
      <LabeledFieldWithAddOn
        validate={async (value) => {
          if (value) {
            const result = await validateGroupNameMutation({ name: value })
            return result
          }
          return null
        }}
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
