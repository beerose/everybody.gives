import dynamic from "next/dynamic"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/groups/components/LoginForm"
import { useRouter } from "next/router"
import { Card } from "app/core/components/Card"
import { useEffect, useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import groupLogin from "app/groups/mutations/groupLogin"

const usePasswordHash = () => {
  const [hashValue, setHashValue] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    const hashValue = hash.replace("#", "").split("=")
    if (hashValue?.[0] === "pwd" || hashValue?.[0] === "password") {
      setHashValue(hashValue?.[1] || "")
    }
  }, [])

  return hashValue
}

const GroupLoginPage: BlitzPage = () => {
  const router = useRouter()
  const name = useParam("name", "string")
  const pwd = usePasswordHash()
  const [groupLoginMutation] = useMutation(groupLogin)

  useEffect(() => {
    if (!pwd) return
    if (!name) return

    groupLoginMutation({ groupName: name, password: pwd })
      .then(() => {
        void router.push(`/${name}/name`)
      })
      .catch(() => {
        void router.replace(`/${name}/login?error=invalid_password`)
      })
  }, [pwd, name])

  useEffect(() => {
    if (router.isReady && router.query.error) {
      const timer = setTimeout(() => {
        void router.replace({ query: { name: router.query.name } })
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [router.isReady])

  return (
    <Layout title="Login">
      <Card>
        <>
          {router.query.error ? (
            <div role="alert" className="text-red-600 text-right mb-8">
              ⚠️ Oops, you had an invalid password in the URL. Please try providing it manually.
            </div>
          ) : null}

          <LoginForm
            password={pwd}
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
