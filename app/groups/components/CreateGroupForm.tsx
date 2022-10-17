import { AuthenticationError } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { useMutation } from "@blitzjs/rpc"
import createGroup from "app/groups/mutations/createGroup"
import { CreateGroupBasicInfo,  CreateGroupMembersInfo } from "../validations"
import { LabeledFieldWithAddOn } from "app/core/components/LabeledFieldWithAddOn"
import {AddMembers} from "./AddMembers"
import arrayMutators from "final-form-arrays"
import LabeledTextareaField from "app/core/components/LabeledTextareaField"
import { Group } from "db"
import { FORM_ERROR, MultistepForm } from "./MultistepForm"
import { useForm } from "react-final-form"
import validateGroupName from "app/groups/mutations/validateGroupName"

type CreateGroupFormProps = {
  onSuccess: (group: Pick<Group, "name">) => void
}

export const CreateGroupForm = (props: CreateGroupFormProps) => {
  const [createGroupMutation] = useMutation(createGroup)
  const [validateGroupNameMutation] = useMutation(validateGroupName)

  return (
    <MultistepForm
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={async (values) => {
        try {
          const group = await createGroupMutation(values)
          if (group) {
            props.onSuccess(group)
          } else {
            // props.onError TODO
          }
        } catch (error: any) {
          if (error.code === "P2002" && error.meta?.target?.includes("name")) {
            // This error comes from Prisma
            return { [FORM_ERROR]: "The group name is already being used" }
          }
          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
          } else {
            return {
              [FORM_ERROR]:
                "Sorry, we had an unexpected error. Please try again.",
              }
          }
        }
      }}
    >
      <MultistepForm.Page schema={CreateGroupBasicInfo} validate={validateGroupNameMutation}>
        <NewGroupBasicFields />
      </MultistepForm.Page>
      <MultistepForm.Page schema={CreateGroupMembersInfo} validate={values => {
        if (values.members.length < 3) {
          return { members: "You have to add at least three group members" }
        }
        const uniqueMembers = new Set(values.members.map(m => m.name))
        if (uniqueMembers.size !== values.members.length) {
          return { members: "You have to add unique group members" }
        }
        return null
      }}>
        <AddMembers />
      </MultistepForm.Page>
    </MultistepForm>
  )
}

const NewGroupBasicFields = () => {
  const form = useForm()
  
  return (
    <>
     <LabeledFieldWithAddOn addOn="everybody.gives/" name="name" label="Group Name *" placeholder="my-party-2022" />
     <LabeledTextField name="createdBy" label="Your Name *" placeholder="Alex" onChangeHook={(value) => {form.change("members", [{name: value}]) }} />
     <LabeledTextField name="password" label="Gorup's Password *" placeholder="Password" type="password" />
     <LabeledTextField name="eventName" label="Event name *" placeholder="Christmas Eve 2022" />
     <LabeledTextareaField name="description" label="Description" placeholder={`Christmas Eve 2022
24/12/2022, Wroclaw, 5pm`} />
  </>)
}