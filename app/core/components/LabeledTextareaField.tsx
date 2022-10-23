import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
  optional?: boolean
}

export const LabeledTextareaField = forwardRef<HTMLTextAreaElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, optional, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, fieldProps)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4" {...outerProps}>
        <label
          htmlFor={name}
          className="block text-right font-medium text-gray-700 sm:mt-px sm:pt-2"
          {...labelProps}
        >
          {label}
          {optional && <span className="block  text-gray-500 font-semibold">Optional</span>}
        </label>
        <div className="mt-1 sm:col-span-3 sm:mt-0">
          <div className="flex rounded-md">
            <textarea
              rows={2}
              className={`block border-2 bg-background px-6 py-4 w-full rounded-md ${
                touched && normalizedError
                  ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                  : "border-gray-600 focus:border-primary-500 focus:ring-primary-500"
              } shadow-sm`}
              {...input}
              disabled={submitting}
              {...props}
              ref={ref}
            />
          </div>
        </div>
      </div>
    )
  }
)

export default LabeledTextareaField
