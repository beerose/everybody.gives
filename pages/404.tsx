import Head from "next/head"
import Layout from "app/core/layouts/Layout"
import { Card } from "app/core/components/Card"

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------

export default function Page404() {
  const statusCode = 404
  const title = "This page could not be found"
  return (
    <Layout title={`${statusCode}: ${title}`}>
      <div className="h-full w-full flex items-center justify-center">
        <div className="bg-white border-2 border-black rounded-xl p-10">
          <style dangerouslySetInnerHTML={{ __html: "body { margin: 0 }" }} />
          {statusCode ? (
            <h1 className="mt-1 text-4xl font-black tracking-tight text-gray-700 text-center">
              {statusCode}
            </h1>
          ) : null}
          <h2 className="mt-3 text-3xl tracking-tight text-gray-700 text-center">{title}</h2>
        </div>
      </div>
    </Layout>
  )
}
