import React, { PropsWithoutRef } from 'react'
import * as z from 'zod'
import { Form, FormProps as FinalFormProps } from 'react-final-form'
import { validateZodSchema } from 'blitz'
export { FORM_ERROR } from 'final-form'

export interface MultistepFormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit' | 'children'> {
  /** Text to display in the submit button */
  onSubmit: FinalFormProps<z.infer<S>>['onSubmit']
  initialValues?: FinalFormProps<z.infer<S>>['initialValues']
  schema?: S
  formName?: string
  mutators?: FinalFormProps<z.infer<S>>['mutators']
  formDescription?: string
  children: MultistepPage<any>[]
}

export type MultistepPage<S extends z.ZodType<any, any>> = React.ReactElement<{
  schema: S
  validate?: (...args: any) => Promise<Record<string, string> | null> | Record<string, string> | null
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

  const next = async (values: Parameters<FinalFormProps<z.infer<S>>['onSubmit']>[0], ...args: any) => {
    if (activePage.props.validate) {
      const result = await activePage.props.validate(values)
      if (result) return result
    }
    if (isLastPage) {
      return onSubmit(values, args)
    }
    setPage((s) => Math.min(s + 1, children.length - 1))
    setInitialValues(values)
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
      render={({ handleSubmit, submitting, submitError, hasValidationErrors, submitSucceeded, submitFailed }) => (
        <form className="space-y-2 divide-y divide-gray-200" onSubmit={handleSubmit} {...props} autoComplete="off">
          <div className="space-y-4 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-4">
              {activePage}

              <div className="pt-5">
                {submitError && (
                  <div role="alert" className="text-sm pb-5 text-red-600">
                    {submitError}
                  </div>
                )}
                <div className="flex justify-end">
                  {page > 0 && (
                    <button
                      type="button"
                      className="bg-white rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={previous}
                    >
                      Previous
                    </button>
                  )}
                  {!isLastPage && (
                    <button
                      onClick={handleSubmit}
                      disabled={submitError || hasValidationErrors}
                      className="ml-3 bg-white rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-50"
                    >
                      Next
                    </button>
                  )}
                  {isLastPage && (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || submitError || hasValidationErrors}
                      type="submit"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-default"
                    >
                      {
                        submitting ? <div className="inline-flex items-center">
                          <svg
                            className="animate-spin mr-2 -ml-1 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Saving...
                        </div> :
                        'Create'}
                    </button>
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
  validate?: (...args: any) => Promise<Record<string, string> | null> | Record<string, string> | null
}) => props.children

MultistepForm.Page = MultistepFormPage
