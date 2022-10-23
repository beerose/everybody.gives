import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
  onChangeHook?: (value: any) => void
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, onChangeHook, ...props }, ref) => {
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
      <div
        className={`sm:grid ${label ? "sm:grid-cols-4" : ""} sm:items-start sm:gap-4`}
        {...outerProps}
      >
        {label && (
          <label
            htmlFor={name}
            className="block text-right font-medium text-gray-700 sm:mt-px sm:pt-2"
            {...labelProps}
          >
            {label}
          </label>
        )}

        <div className={`mt-1 sm:col-span-3 sm:mt-0`}>
          <div className="flex rounded-md">
            <input
              data-lpignore="true"
              type="text"
              id={name}
              className={`block border-2 bg-background px-0 indent-6 py-4 w-full min-w-0 flex-1 rounded-md ${
                touched && normalizedError
                  ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                  : "border-gray-600 focus:border-primary-500 focus:ring-primary-500"
              }`}
              {...input}
              disabled={submitting}
              onChange={(e) => {
                onChangeHook?.(e.target.value)
                input.onChange(e)
              }}
              {...props}
              ref={ref}
            />
          </div>
        </div>
      </div>
    )
  }
)

export default LabeledTextField
