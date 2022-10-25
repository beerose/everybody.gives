import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { DuplicateIcon } from "@heroicons/react/outline"
import { gSSP } from "app/blitz-server"
import { Button } from "app/core/components/Button"
import { Card } from "app/core/components/Card"
import Layout from "app/core/layouts/Layout"
import { MembersCard } from "app/groups/components/MemberCard"
import drawPerson from "app/groups/mutations/drawPerson"
import groupLogin from "app/groups/mutations/groupLogin"
import getGroup from "app/groups/queries/getGroup"
import { AuthenticationError } from "blitz"
import Link from "next/link"
import { useReward } from "react-rewards"

export const getServerSideProps = gSSP(async ({ ctx }) => {
  if (ctx.session.$isAuthorized()) {
    return {
      props: {
        groupName: ctx.session.groupName,
        userName: ctx.session.userName,
      },
    }
  }

  return { notFound: true }
})

const GroupPage: BlitzPage = ({ groupName, userName }: { groupName: string; userName: string }) => {
  const [drawPersonMutation, { data }] = useMutation(drawPerson)
  const [group] = useQuery(getGroup, { groupName })

  const { reward, isAnimating } = useReward("rewardId", "confetti", {
    elementCount: 200,
    lifetime: 500,
    elementSize: 10,
    startVelocity: 20,
    angle: 70,
    spread: 150,
  })

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
      <div className="h-full w-full flex items-center justify-center">
        <Card>
          <h1 className="mt-1 text-5xl font-black tracking-tight text-gray-700">
            Welcome to {group.eventName}, {userName}!
          </h1>
          <div className="flex justify-start my-6 items-center" id={"rewardId"}>
            <Button
              width={215}
              disabled={!!data}
              onClick={async () => {
                const response = await drawPersonMutation({
                  groupName: group.name,
                  memberName: userName,
                })
                if (response.result) {
                  reward()
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
              <dd className="mt-1  text-gray-900 sm:col-span-2 sm:mt-0 flex items-center">
                https://everybody.gives/{group.name}
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(`https://everybody.gives/${group.name}`)
                  }
                  type="button"
                  className="ml-2 inline-flex items-center rounded-full border border-transparent bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <DuplicateIcon
                    className="h-5 w-5 text-gray-400 hover:text-gray-700"
                    aria-hidden="true"
                  />
                </button>
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
      </div>
    </Layout>
  )
}

export default GroupPage
