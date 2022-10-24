import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { validateZodSchema } from "blitz"
import { Button } from "./Button"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  formName?: string
  mutators?: FinalFormProps<z.infer<S>>["mutators"]
  formDescription?: string
  cancelButton?: boolean
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  formName,
  formDescription,
  mutators,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      mutators={mutators}
      render={({ handleSubmit, submitting, submitError }) => {
        return (
          <form
            className="space-y-4 divide-y divide-gray-200"
            onSubmit={handleSubmit}
            {...props}
            autoComplete="off"
          >
            <div className="space-y-4 divide-y divide-gray-200 sm:space-y-5">
              <div className="space-y-4">
                {formName && (
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">{formName}</h3>
                    {formDescription && (
                      <p className="mt-1 max-w-2xl  text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                      </p>
                    )}
                  </div>
                )}
                {children}

                {submitError && (
                  <div role="alert" className=" text-red-600 text-right">
                    {submitError}
                  </div>
                )}

                <div className="pt-5">
                  <div className="flex justify-end">
                    {props.cancelButton && (
                      <button
                        type="button"
                        className="bg-white rounded-md border border-gray-300 py-2 px-4  font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    )}
                    <Button type="submit" width={130} disabled={submitting}>
                      {submitText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )
      }}
    />
  )
}

export default Form
