import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { useRouter } from "next/router"
import { Card } from "app/core/components/Card"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getGroupMembers from "app/groups/queries/getGroupMembers"
import { MembersCard } from "app/groups/components/MemberCard"
import groupMemberLogin from "app/groups/mutations/groupMemberLogin"
import { gSSP } from "app/blitz-server"
import { PromiseReturnType } from "blitz"

export const getServerSideProps = gSSP(async ({ ctx, query }) => {
  if (query.name && typeof query.name === "string") {
    const members = await getGroupMembers({ groupName: query.name as string }, ctx)

    return {
      props: {
        members,
      },
    }
  }

  return {
    notFound: true,
  }
})

const GroupLoginPage2: BlitzPage = ({
  members,
}: {
  members: PromiseReturnType<typeof getGroupMembers>
}) => {
  const router = useRouter()
  const groupname = useParam("name", "string")
  const [memberLoginMutation] = useMutation(groupMemberLogin)

  return (
    <Layout title="Login">
      <div className="h-full w-full flex items-center justify-center ">
        <Card>
          <div className="text-center">
            <h1 className="mt-1 text-5xl font-black tracking-tight text-gray-700 text-center">
              Select your name
            </h1>
          </div>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10"
          >
            {members?.map((member) => {
              return (
                <button
                  key={member}
                  className="hover:scale-105"
                  onClick={async () => {
                    await memberLoginMutation({ groupName: groupname!, memberName: member })
                    await router.push(Routes.GroupPage({ name: groupname! }))
                  }}
                >
                  <MembersCard name={member} className="bg-background" />
                </button>
              )
            })}
          </ul>
        </Card>
      </div>
    </Layout>
  )
}

export default GroupLoginPage2
