import dynamic from "next/dynamic"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { useRouter } from "next/router"
import { Card } from "app/core/components/Card"
import { useEffect, useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import groupLogin from "app/groups/mutations/groupLogin"

const GroupLoginPage: BlitzPage = () => {
  const router = useRouter()
  const [password, setPassowrd] = useState("")
  // const [groupLoginMutation] = useMutation(groupLogin)
  // const [authenticated, setAuthenticated] = useState("error" in router.query ? true : false)

  // add some loading state or something

  useEffect(() => {
    console.log(router.asPath)
    const pwd = window?.location.hash.split("=")[1]
    if (!pwd) {
      return
    }
    // should authenticate and redirect
    setPassowrd(pwd)
    // groupLoginMutation({ groupName: router.query.name as string, password: pwd })
    //   .then(() => {
    //     setAuthenticated(true)
    //     router.push(`/${router.query.name}/login2`)
    //   })
    //   .catch(() => {
    //     setAuthenticated(true)
    //     router.push(`/${router.query.name}/login?error=invalid_password`)
    //   })

    if (router.isReady && router.query.error) {
      const timer = setTimeout(() => {
        router.replace({ query: { name: router.query.name } })
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [router.isReady, window.location.hash])

  return (
    <Layout title="Login">
      <Card>
        <>
          {router.query.error ? (
            <div role="alert" className="text-red-600 text-left mb-8">
              ⚠️ Oops, you had an invalid password in the URL. Please try providing it manually.
            </div>
          ) : null}

          <LoginForm
            password={password}
            onSuccess={async (group) => {
              await router.push(Routes.GroupLoginPage2({ name: group.name }))
            }}
          />
        </>
      </Card>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(GroupLoginPage), {
  ssr: false,
})
