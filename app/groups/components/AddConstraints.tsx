import { CogIcon, PlusIcon, XIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import { Field, useFormState } from "react-final-form"
import { useFieldArray } from "react-final-form-arrays"

const RuleInputs = ({
  idx,
  members,
  formState,
  onDelete,
}: {
  idx: number
  members: string[]
  formState: { person1: string; person2: string }[]
  onDelete: () => void
}) => {
  const formStateErrors = useFormState()
  const [person1, setPerson1] = useState(formState[idx]?.person1 ?? "")
  const [_person2, setPerson2] = useState(formState[idx]?.person2 ?? "")
  const [selectedLeft, setSelectedLeft] = useState(formState.map((rule) => rule.person1))

  useEffect(() => {
    setPerson1(formState[idx]?.person1 ?? "")
    setPerson2(formState[idx]?.person2 ?? "")
    setSelectedLeft(formState.map((rule) => rule.person1))
  }, [formState])

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <div>
        <Field
          component="select"
          name={`rules[${idx}].person1`}
          className={`block w-full rounded-md border-gray-300 pl-3 pr-16 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500
            ${formStateErrors?.errors?.rules?.[idx]?.person1 ? "border-red-500" : ""}
          `}
        >
          <option hidden>Select a person</option>
          {members
            .filter((m) => !selectedLeft.includes(m) || m === person1)
            .map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </Field>
      </div>
      <div className="block font-medium text-gray-700 text-center">cannot draw</div>
      <div>
        <Field
          component="select"
          name={`rules[${idx}].person2`}
          className={`block w-full rounded-md border-gray-300 pl-3 pr-16 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500
          ${formStateErrors?.errors?.rules?.[idx]?.person2 ? "border-red-500" : ""}
          `}
        >
          <option hidden value={undefined}>
            Select a person
          </option>
          {members
            .filter((m) => m !== person1)
            .map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </Field>
      </div>
      <button
        onClick={onDelete}
        type="button"
        className="m-2 self-auto text-gray-400 hover:text-gray-700 inline-flex items-center rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <XIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}

export const AddConstraints = () => {
  const formState = useFormState()
  const { fields } = useFieldArray("rules")

  return (
    <div className="space-y-8">
      <div className="text-center">
        <CogIcon className="mx-auto h-20 w-20 text-gray-400" />
        <h1 className="mt-1 text-5xl font-black tracking-tight text-gray-700 text-center">
          Exclusions
        </h1>
      </div>
      {formState.submitErrors?.members && (
        <div role="alert" className=" text-red-600">
          {formState.submitErrors.members}
        </div>
      )}
      <div className="space-y-4">
        {!formState.values?.rules?.length && (
          <span className="text-gray-500  self-center">You haven't added any rules yet.</span>
        )}
        <ul role="list" className="flex flex-col space-y-6">
          {formState.values.rules?.map((_, idx) => {
            return (
              <RuleInputs
                key={idx}
                idx={idx}
                members={formState.values.members.map((m) => m.name)}
                formState={formState.values.rules}
                onDelete={() => fields.remove(idx)}
              />
            )
          })}
        </ul>
        <button
          disabled={formState.errors?.rules}
          onClick={() => {
            fields.push({ person1: undefined, person2: undefined })
          }}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:hover:bg-primary-600 disabled:opacity-50"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Rule
        </button>
      </div>
    </div>
  )
}
