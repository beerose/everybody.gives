import { UserGroupIcon, XIcon } from "@heroicons/react/outline"
import { useEffect, useRef, useState } from "react"
import { useFormState } from "react-final-form"
import { useFieldArray } from "react-final-form-arrays"

type MembersCardsProps = {
  name: string
  onDelete: () => void
}
const MembersCard = ({ name, onDelete }: MembersCardsProps) => {
  return (
    <li className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow">
      <button
        type="button"
        onClick={() => {
          onDelete()
        }}
        className="m-2 self-end text-gray-400 hover:text-gray-700 inline-flex items-center rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <XIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="flex flex-1 flex-col p-8">
        <h3 className="text-sm font-medium text-gray-700">{name}</h3>
      </div>
    </li>
  )
}

const NewMemberInput = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <li className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-b border-gray-300 pb-6">
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm col-span-2"
        placeholder="New member name..."
      />
      <button
        type="submit"
        disabled={value === ""}
        onClick={() => {
          onSubmit(value)
          setValue("")
        }}
        className="self-end flex-shrink-0 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:hover:bg-indigo-600"
      >
        Add
      </button>
    </li>
  )
}

export const AddMembers = () => {
  const { fields } = useFieldArray("members")
  const formState = useFormState()

  return (
    <div className="space-y-8 w-[400px]">
      <div className="text-center">
        <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400 stroke-1" />
        <h2 className="mt-1 text-lg font-medium text-gray-900">Group members</h2>
        <p className="text-gray-500 text-sm self-center">
          Add at least three members to your group.
        </p>
      </div>
      {formState.errors?.members && (
        <div role="alert" className="text-sm text-red-600">
          {formState.errors.members}
        </div>
      )}
      <NewMemberInput
        onSubmit={(value) => {
          fields.push({ name: value })
        }}
      />
      <div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {fields.value?.map((value, personIdx) => (
            <MembersCard
              key={personIdx}
              name={value.name}
              onDelete={() => fields.remove(personIdx)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
