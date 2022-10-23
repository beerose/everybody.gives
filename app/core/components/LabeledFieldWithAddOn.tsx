import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
  addOn: string
}

export const LabeledFieldWithAddOn = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, addOn, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:pt-5" {...outerProps}>
        <label
          htmlFor={name}
          className="block text-right font-medium text-gray-700 sm:mt-px sm:pt-2"
          {...labelProps}
        >
          {label}
        </label>

        <div className="mt-1 sm:col-span-3 sm:mt-0">
          <div className="flex rounded-md">
            <span className="inline-flex items-center rounded-l-md border-2 border-r-0 border-gray-600 bg-gray-100 px-3 text-gray-500">
              {addOn}
            </span>
            <input
              type="text"
              id={name}
              className={`block border-2 bg-background px-0 indent-3 py-4 w-full min-w-0 flex-1 rounded-none rounded-r-md ${
                touched && normalizedError
                  ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                  : "border-gray-600 focus:border-primary-500 focus:ring-primary-500"
              }`}
              {...input}
              disabled={submitting}
              {...props}
              ref={ref}
              data-lpignore="true"
            />
          </div>
          {submitError && (
            <span role="alert" className=" text-left text-red-600">
              {submitError}
            </span>
          )}
        </div>
      </div>
    )
  }
)
