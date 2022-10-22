import { AuthenticationError } from "blitz"
import { useMutation } from "@blitzjs/rpc"
import createGroup from "app/groups/mutations/createGroup"
import { CreateGroupBasicInfo, CreateGroupMembersInfo, CreateGroupRules } from "../validations"
import { AddMembers } from "./AddMembers"
import arrayMutators from "final-form-arrays"
import { Group } from "db"
import { FORM_ERROR, MultistepForm } from "./MultistepForm"
import validateGroupName from "app/groups/mutations/validateGroupName"
import { NewGroupBasicFields } from "./NewGroupBasicInfo"
import { AddConstraints } from "./AddConstraints"

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
          }
        } catch (error) {
          if (error.code === "P2002" && error.meta?.target?.includes("name")) {
            // This error comes from Prisma
            return { [FORM_ERROR]: "The group name is already being used" }
          }
          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
          } else {
            return {
              [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
            }
          }
        }
      }}
    >
      <MultistepForm.Page schema={CreateGroupBasicInfo} validate={validateGroupNameMutation}>
        <NewGroupBasicFields />
      </MultistepForm.Page>

      <MultistepForm.Page
        schema={CreateGroupMembersInfo}
        validate={(values) => {
          if (values.members.length < 3) {
            return { members: "You have to add at least three group members" }
          }
          const uniqueMembers = new Set(values.members.map((m) => m.name))
          if (uniqueMembers.size !== values.members.length) {
            return { members: "You have to add unique group members" }
          }
          return null
        }}
      >
        <AddMembers />
      </MultistepForm.Page>

      <MultistepForm.Page schema={CreateGroupRules}>
        <AddConstraints />
      </MultistepForm.Page>
    </MultistepForm>
  )
}
