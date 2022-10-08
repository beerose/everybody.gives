import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import createGroup from "app/groups/mutations/createGroup"
import { CreateGroupInput } from "../validations"
import { LabeledGroupNameTextField } from "app/core/components/LabeledGroupNameField"

type CreateGroupFormProps = {
  onSuccess?: (group: PromiseReturnType<typeof createGroup>) => void
}

export const CreateGroupForm = (props: CreateGroupFormProps) => {
  const [createGroupMutation] = useMutation(createGroup)
  return (
    <Form
      submitText="Create"
      schema={CreateGroupInput}
      initialValues={{ name: "", password: "" }}
      onSubmit={async (values) => {
        try {
          const group = await createGroupMutation(values)
          props.onSuccess?.(group)
        } catch (error: any) {
          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
          } else {
            return {
              [FORM_ERROR]:
                "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
            }
          }
        }
      }}
    >
      <LabeledGroupNameTextField name="group_name" label="Group Name" placeholder="my-party-2022" />
      <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
    </Form>
  )
}
