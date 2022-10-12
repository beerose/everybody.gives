import { AuthenticationError } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { FORM_ERROR } from "app/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import createGroup from "app/groups/mutations/createGroup"
import { CreateGroupBasicInfo, CreateGroupInput, CreateGroupMembersInfo } from "../validations"
import { LabeledFieldWithAddOn } from "app/core/components/LabeledFieldWithAddOn"
import {AddMembers} from "./AddMembers"
import arrayMutators from "final-form-arrays"
import LabeledTextareaField from "app/core/components/LabeledTextareaField"
import { Group } from "db"
import { MultistepForm } from "./MultistepForm"

type CreateGroupFormProps = {
  onSuccess: (group: Pick<Group, "name">) => void
}

export const CreateGroupForm = (props: CreateGroupFormProps) => {
  const [createGroupMutation] = useMutation(createGroup)

  return (
    <MultistepForm
      submitText="Create"
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={async (values) => {
        try {
          const group = await createGroupMutation(values)
          props.onSuccess(group)
        } catch (error: any) {
          if (error.code === "P2002" && error.meta?.target?.includes("name")) {
            // This error comes from Prisma
            return { name: "This group name is already being used" }
          }
          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
          } else {
            console.error(error)
            return {
              [FORM_ERROR]:
                "Sorry, we had an unexpected error. Please try again.",
              }
          }
        }
      }}
    >
      <MultistepForm.Page schema={CreateGroupBasicInfo}>
        <LabeledFieldWithAddOn addOn="everybody.gives/" name="name" label="Group Name *" placeholder="my-party-2022" />
        <LabeledTextField name="createdBy" label="Your Name *" placeholder="Alex" />
        <LabeledTextField name="password" label="Gorup's Password *" placeholder="Password" type="password" />
        <LabeledTextField name="eventName" label="Event name *" placeholder="Christmas Eve 2022" />
        <LabeledTextareaField name="description" label="Description" placeholder={`Christmas Eve 2022
24/12/2022, Wroclaw, 5pm`} />
      </MultistepForm.Page>
      <MultistepForm.Page schema={CreateGroupMembersInfo}>
        <AddMembers />
      </MultistepForm.Page>
    </MultistepForm>
  )
}