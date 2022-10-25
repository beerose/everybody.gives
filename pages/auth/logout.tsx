import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import logout from "app/groups/mutations/logout"

const LogoutPage: BlitzPage = () => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  return (
    <Layout title="Sign Up">
      <button
        onClick={async () => {
          await logoutMutation()
          void router.push(Routes.Home())
        }}
      >
        Logout
      </button>
    </Layout>
  )
}

export default LogoutPage
