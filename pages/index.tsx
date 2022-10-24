import Layout from "app/core/layouts/Layout"
import { Routes, BlitzPage } from "@blitzjs/next"
import Link from "next/link"
import React from "react"
import { Button } from "app/core/components/Button"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <main className="h-full flex items-center p-6 sm:p-10">
        <div className="text-left">
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-8xl flex flex-col">
            <span
              style={{
                textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
              }}
              className="block text-background xl:inline"
            >
              GIFTING MADE
            </span>
            <span
              style={{
                textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              }}
              className="block xl:inline md:whitespace-nowrap"
            >
              EASIER
            </span>
          </h1>
          <p className="mt-3 text-base text-gray-800 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl md:mx-0 !leading-8">
            Hard to find thoughtful presents? Focus on one&nbsp;person. Make&nbsp;more personalized,
            environmentally friendly, and financially conscious&nbsp;presents.
          </p>
          <div className="mt-5 sm:mt-8 flex justify-start">
            <div className="inline">
              <Link href={Routes.NewGroup()}>
                <Button as="a" width={200}>
                  GET STARTED
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
