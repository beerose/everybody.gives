import { XIcon } from "@heroicons/react/outline"

export type MembersCardsProps = {
  name: string
  onDelete?: () => void
}

export const MembersCard = ({ name, onDelete }: MembersCardsProps) => {
  return (
    <li className="col-span-1 flex flex-col rounded-lg bg-background text-center shadow border-2 border-black">
      {onDelete && (
        <button
          type="button"
          onClick={() => {
            onDelete()
          }}
          className="m-2 self-end text-gray-400 hover:text-gray-700 inline-flex items-center rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <XIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      <div className="flex flex-1 flex-col py-8 px-4">
        <h3 className=" font-medium text-gray-700">{name}</h3>
      </div>
    </li>
  )
}
