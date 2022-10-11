import { AuthenticationError, PromiseReturnType, validateZodSchema } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import createGroup from "app/groups/mutations/createGroup"
import { CreateGroupInput } from "../validations"
import { LabeledFieldWithAddOn } from "app/core/components/LabeledFieldWithAddOn"
import {AddMembers} from "./AddMembers"
import arrayMutators from "final-form-arrays"

type CreateGroupFormProps = {
  onSuccess?: (group: PromiseReturnType<typeof createGroup>) => void
}

export const CreateGroupForm = (props: CreateGroupFormProps) => {
  const [createGroupMutation] = useMutation(createGroup)

  return (
    <Form
      submitText="Create"
      schema={CreateGroupInput}
      initialValues={{ name: "", password: "", createdBy: "" }}
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={async (values) => {
        try {
          console.log({values})
          const group = await createGroupMutation(values)
          props.onSuccess?.(group)
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
      <LabeledFieldWithAddOn addOn="everybody.gives/" name="name" label="Group Name" placeholder="my-party-2022" />
      <LabeledTextField name="createdBy" label="Your Name" placeholder="Alex" />
      <LabeledTextField name="settings.eventName" label="Event name" placeholder="Christmas Eve 2022" />
      <LabeledTextField name="password" label="Gorup's Password" placeholder="Password" type="password" />
      <LabeledTextField type="number" name="settings.amount" label="Amount" placeholder="50" />
      <AddMembers />
    </Form>
  )
}