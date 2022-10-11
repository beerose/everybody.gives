import Layout from "app/core/layouts/Layout"
import { useRouter } from "next/router"

const GroupPage = () => {
  const router = useRouter()

  console.log({router})

  return (
    <Layout title="New Group">
			<main className="h-full flex items-center flex-col justify-center">
        {router.query.name}
      </main>
    </Layout>
  )
}

export default GroupPage