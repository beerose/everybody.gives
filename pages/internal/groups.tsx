import { Routes } from "@blitzjs/next"
import { gSSP } from "app/blitz-server"
import Layout from "app/core/layouts/Layout"
import db, { Group } from "db"
import Link from "next/link"

export const getServerSideProps =  gSSP<{groups: Group[]}>(async () => {
  const groups = await db.group.findMany({
    include: {
      members: true,
    },
  })

  return {
    props: {groups}
  }
})

const GroupsPage = (props: {groups: Group[]}) => {
  return (
    <div>
      <h1>Groups</h1>

      <ul className="space-y-6">
        {props.groups.map((group) => (
          <li key={group.id} className="">
            <Link href={Routes.GroupPage({name: group.name})}>
              <a className="cursor-pointer bold underline">{group.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

GroupsPage.getLayout = (page) => <Layout title="Groups">{page}</Layout>

export default GroupsPage