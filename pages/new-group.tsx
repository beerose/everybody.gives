import Layout from "app/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { CreateGroupForm } from "app/groups/components/CreateGroupForm"
import { useRouter } from "next/router"

const NewGroup: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="New Group">
      <div className="py-4 lg:py-8 w-full h-full flex flex-col items-center justify-center">
        <CreateGroupForm
          onSuccess={async (newGroup) => {
            await router.push(Routes.GroupPage({ name: newGroup.name }))
          }}
        />
      </div>
    </Layout>
  )
}

export default NewGroup
