import Layout from "app/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { CreateGroupForm } from "app/groups/components/CreateGroupForm"
import { useRouter } from "next/router"

const NewGroup: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="New Group">
      <CreateGroupForm
        onSuccess={async (newGroup) => {
          await router.push(Routes.GroupPage({ name: newGroup.name }))
        }}
      />
    </Layout>
  )
}

export default NewGroup
