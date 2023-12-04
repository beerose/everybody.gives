import React, { PropsWithoutRef } from "react"
import * as z from "zod"
import { Form, FormProps as FinalFormProps } from "react-final-form"
import { validateZodSchema } from "blitz"
export { FORM_ERROR } from "final-form"

import { Button } from "../../core/components/Button"

export interface MultistepFormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit" | "children"> {
  /** Text to display in the submit button */
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  schema?: S
  formName?: string
  mutators?: FinalFormProps<z.infer<S>>["mutators"]
  formDescription?: string
  children: MultistepPage<any>[]
}

export type MultistepPage<S extends z.ZodType<any, any>> = React.ReactElement<{
  schema: S
  validate?: (
    ...args: any
  ) => Promise<Record<string, string> | null> | Record<string, string> | null
}>

export const MultistepForm = <S extends z.ZodType<any, any>>({
  children,
  schema,
  onSubmit,
  formName,
  formDescription,
  mutators,
  ...props
}: MultistepFormProps<S>) => {
  const [page, setPage] = React.useState(0)
  const [initialValues, setInitialValues] = React.useState(props.initialValues)

  const next = async (
    values: Parameters<FinalFormProps<z.infer<S>>["onSubmit"]>[0],
    ...args: any
  ) => {
    setInitialValues(values)
    // if (activePage.props.validate) {
    //   const result = await activePage.props.validate(values)
    //   if (result) return result
    // }
    if (isLastPage) {
      return onSubmit(values, args)
    }
    setPage((s) => Math.min(s + 1, children.length - 1))
  }

  const previous = () => setPage((p) => Math.max(p - 1, 0))

  const activePage = React.Children.toArray(children)[page] as MultistepPage<any>
  const isLastPage = page === React.Children.count(children) - 1

  return (
    <Form
      initialValues={initialValues}
      validate={validateZodSchema(activePage.props.schema)}
      onSubmit={next}
      schema={activePage.props.schema}
      mutators={mutators}
      render={({ handleSubmit, submitting, submitError, hasValidationErrors }) => (
        <form className="space-y-2 w-full" onSubmit={handleSubmit} {...props} autoComplete="off">
          <div className="space-y-4 sm:space-y-5">
            <div className="space-y-7">
              {activePage}

              <div>
                {submitError && (
                  <div role="alert" className=" pb-5 text-red-600">
                    {submitError}
                  </div>
                )}
                <div className="flex gap-3 justify-end h-14">
                  {page > 0 && (
                    <Button type="button" variant="secondary" onClick={previous}>
                      PREV
                    </Button>
                  )}
                  {!isLastPage && (
                    <Button width={105} type="submit">
                      NEXT
                    </Button>
                  )}
                  {isLastPage && (
                    <Button
                      type="submit"
                      width={150}
                      disabled={submitting || submitError || hasValidationErrors}
                    >
                      {submitting ? "SAVING" : "CREATE"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    />
  )
}

const MultistepFormPage = <T extends z.ZodType<any, any>>(props: {
  schema?: T
  children: any
  validate?: (
    ...args: any
  ) => Promise<Record<string, string> | null> | Record<string, string> | null
}) => props.children

MultistepForm.Page = MultistepFormPage
