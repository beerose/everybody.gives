import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { useRouter } from "next/router"
import { Card } from "app/core/components/Card"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getGroupMembers from "app/groups/queries/getGroupMembers"
import { MembersCard } from "app/groups/components/MemberCard"
import groupMemberLogin from "app/groups/mutations/groupMemberLogin"

/**
 should show different pages based on password
 if password in url and authenticated -> show members cards 
 let that be no password case
 */

const GroupLoginPage2: BlitzPage = () => {
  const router = useRouter()
  const groupname = useParam("name", "string")
  const [members] = useQuery(getGroupMembers, { groupName: groupname! })
  const [memberLoginMutation] = useMutation(groupMemberLogin)

  return (
    <Layout title="Login">
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
                  router.push(Routes.GroupPage({ name: groupname! }))
                }}
              >
                <MembersCard name={member} className="bg-background" />
              </button>
            )
          })}
        </ul>
      </Card>
    </Layout>
  )
}

export default GroupLoginPage2
