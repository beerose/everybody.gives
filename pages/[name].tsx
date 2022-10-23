import { useSession } from "@blitzjs/auth"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { ArrowRightIcon } from "@heroicons/react/outline"
import { Card } from "app/core/components/Card"
import Layout from "app/core/layouts/Layout"
import drawPerson from "app/groups/mutations/drawPerson"
import getGroup from "app/groups/queries/getGroup"
import Link from "next/link"
import { useRouter } from "next/router"

const GroupPage: BlitzPage = () => {
  const router = useRouter()
  const session = useSession()
  const [drawPersonMutation] = useMutation(drawPerson)

  if (!router.query.name || typeof router.query.name !== "string") {
    return (
      <div>
        No group found. Go to the{" "}
        <Link href={Routes.Home()}>
          <a className="cursor-pointer bold underline">home page</a>
        </Link>
        .
      </div>
    )
  }

  const [group] = useQuery(getGroup, { groupName: router.query.name })

  if (!group) {
    return (
      <div>
        No group found. Go to the{" "}
        <Link href={Routes.Home()}>
          <a className="cursor-pointer bold underline">home page</a>
        </Link>
        .
      </div>
    )
  }

  return (
    <Card>
      <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-4xl">
        <span className="block xl:inline">
          Welcome to {group.eventName}
          {session.userName ? `, ${session.userName}` : ""}!
        </span>
      </h1>
      <div className="flex justify-start my-6">
        <div className="inline">
          <button
            onClick={async () => {
              try {
                const result = await drawPersonMutation({
                  groupName: group.name,
                  memberName: "Ola",
                })
                console.log({ result })
              } catch (e) {
                console.log(e)
              }
            }}
            className="cursor-pointer group flex flex-row w-full whitespace-nowrap h-full items-center justify-center rounded-full border-2 border-black bg-action px-4 font-semibold py-3 text-xl hover:text-background hover:bg-black md:py-4 md:px-6"
          >
            <div className="flex pt-1">
              <ArrowRightIcon className="transition transform group-hover:translate-x-[135px] motion-reduce:transition-none motion-reduce:group-hover:transform-none w-6 h-6 stroke-1.5" />
              <span className="transition transform group-hover:-translate-x-6 motion-reduce:transition-none motion-reduce:group-hover:transform-none ml-1 group-hover:ml-0">
                DRAW A NAME
              </span>
            </div>
          </button>
        </div>
      </div>
      <dl>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
          <dt className=" font-bold text-gray-500">Group url</dt>
          <dd className="mt-1  text-gray-900 sm:col-span-2 sm:mt-0">
            https://everybody.gives/{group.name}
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
          <dt className=" font-bold text-gray-500">Created by</dt>
          <dd className="mt-1  text-gray-900 sm:col-span-2 sm:mt-0">{group.createdBy}</dd>
        </div>
        {group.description && (
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
            <dt className=" font-bold text-gray-500">Description</dt>
            <dd className="mt-1  text-gray-900 sm:col-span-2 sm:mt-0">{group.description}</dd>
          </div>
        )}
      </dl>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-6"
      >
        {group.members.map((member) => (
          <li className="col-span-1 flex flex-col rounded-lg bg-background text-center shadow border-2 border-black">
            <div className="flex flex-1 flex-col p-8">
              <h3 className=" font-bold text-gray-700">{member.name}</h3>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

GroupPage.getLayout = (page) => (
  <Layout title="New Group">
    <main className="h-full flex items-center flex-col justify-center">{page}</main>
  </Layout>
)

export default GroupPage
