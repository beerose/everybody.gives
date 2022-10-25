import { AuthenticationError, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import groupLogin from "app/groups/mutations/groupLogin"
import { z } from "zod"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof groupLogin>) => void
  password?: string
}

export const LoginForm = (props: LoginFormProps) => {
  const router = useRouter()
  const [groupName, setGroupName] = useState("")

  useEffect(() => {
    setGroupName(router.query.name as string)
  }, [router.isReady])

  const [loginMutation] = useMutation(groupLogin)
  return (
    <Form
      submitText="Login"
      schema={z.object({ password: z.string() })}
      initialValues={{ password: props.password || "" }}
      onSubmit={async (values) => {
        try {
          const group = await loginMutation({ password: values.password, groupName })
          props.onSuccess?.(group)
        } catch (error: any) {
          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid." }
          } else {
            return {
              [FORM_ERROR]:
                "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
            }
          }
        }
      }}
    >
      <LabeledTextField
        name="password"
        label="Group's password"
        placeholder="Password"
        type="password"
      />
    </Form>
  )
}

export default LoginForm
