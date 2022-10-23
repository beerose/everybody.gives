import { useSession } from "@blitzjs/auth"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { ArrowRightIcon } from "@heroicons/react/outline"
import { Button } from "app/core/components/Button"
import { Card } from "app/core/components/Card"
import Layout from "app/core/layouts/Layout"
import { MembersCard } from "app/groups/components/MemberCard"
import drawPerson from "app/groups/mutations/drawPerson"
import getGroup from "app/groups/queries/getGroup"
import Link from "next/link"
import { useRouter } from "next/router"
import { useReward } from "react-rewards"

const GroupPage: BlitzPage = () => {
  const router = useRouter()
  const session = useSession()
  const [drawPersonMutation, { data, error, isLoading }] = useMutation(drawPerson)
  const [group] = useQuery(getGroup, { groupName: router.query.name as string })

  const { reward, isAnimating } = useReward("rewardId", "confetti", {
    elementCount: 200,
    lifetime: 500,
    elementSize: 10,
    startVelocity: 20,
    angle: 70,
    spread: 150,
  })

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
    <Layout title={group.eventName}>
      <Card>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-4xl">
          <span className="block xl:inline">
            Welcome to {group.eventName}
            {session.userName ? `, ${session.userName}` : ""}!
          </span>
        </h1>
        <div className="flex justify-start my-6 items-center" id={"rewardId"}>
          <Button
            width={215}
            disabled={!!data}
            onClick={async () => {
              try {
                const response = await drawPersonMutation({
                  groupName: group.name,
                  memberName: "Ola", // todo
                })
                if (response.result) {
                  reward()
                }
              } catch (e) {
                console.error(e)
              }
            }}
          >
            DRAW A NAME
          </Button>
          <span role="alert" className="ml-3 text-left text-red-600">
            {data?.error}
          </span>
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
          {group.members.map((member) => {
            let className = " bg-background"
            if (data?.result === member.name) {
              className = isAnimating
                ? " animate-[wiggle_1s_ease-in-out_infinite] bg-action"
                : " bg-action scale-120"
            }
            if (data?.result !== member.name && data?.result) {
              className = " bg-background opacity-50"
            }
            return <MembersCard key={member.name} name={member.name} className={className} />
          })}
        </ul>
      </Card>
    </Layout>
  )
}

export default GroupPage
