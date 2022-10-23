import { UserGroupIcon, XIcon } from "@heroicons/react/solid"
import { useEffect, useRef, useState } from "react"
import { useFormState } from "react-final-form"
import { useFieldArray } from "react-final-form-arrays"

type MembersCardsProps = {
  name: string
  onDelete: () => void
}
const MembersCard = ({ name, onDelete }: MembersCardsProps) => {
  return (
    <li className="col-span-1 flex flex-col rounded-lg bg-background text-center shadow border-2 border-black">
      <button
        type="button"
        onClick={() => {
          onDelete()
        }}
        className="m-2 self-end text-gray-400 hover:text-gray-700 inline-flex items-center rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <XIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="flex flex-1 flex-col py-8 px-4">
        <h3 className=" font-medium text-gray-700">{name}</h3>
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
    <li className="grid grid-cols-1 gap-6 sm:grid-cols-4 pb-6">
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block indent-2 py-4 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 col-span-3"
        placeholder="New member name..."
      />
      <button
        type="submit"
        disabled={value === ""}
        onClick={() => {
          onSubmit(value)
          setValue("")
        }}
        className="self-end flex-shrink-0 rounded-md border border-transparent bg-primary-600 px-6 py-4 font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:hover:bg-primary-600"
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
    <div className="space-y-8 w-full">
      <div className="text-center">
        <UserGroupIcon className="mx-auto h-20 w-20 text-gray-400" />
        <h1 className="mt-1 text-5xl font-black tracking-tight text-gray-700 text-center">
          Group members
        </h1>
      </div>
      {formState.errors?.members && "members" && (
        <div role="alert" className=" text-gray-600 text-center">
          ⚠️ {formState.errors.members}
        </div>
      )}
      <NewMemberInput
        onSubmit={(value) => {
          fields.push({ name: value })
        }}
      />
      <div>
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4">
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
