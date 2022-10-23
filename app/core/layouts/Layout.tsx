import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { GiftIcon } from "@heroicons/react/outline"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title || "everybody-gives"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full p-6 sm:p-20 lg:p-28 items-center relative">
        <div className="absolute t-200 l-500 opacity-100 -z-10">
          <svg
            width="300"
            height="300"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="28.5249"
              y="157.314"
              width="232.368"
              height="166.328"
              rx="3.85"
              transform="rotate(-20.8003 28.5249 157.314)"
              stroke="black"
              strokeOpacity="0.64"
              strokeWidth="0.5"
            />
            <rect
              x="124.6"
              y="120.818"
              width="26.8209"
              height="166.328"
              transform="rotate(-20.8003 124.6 120.818)"
              stroke="black"
              strokeOpacity="0.64"
              strokeWidth="0.5"
            />
            <rect
              x="0.0858"
              y="-0.193957"
              width="25.8647"
              height="232.136"
              transform="matrix(-0.360797 -0.932645 0.932797 -0.360403 63.3729 247.666)"
              stroke="black"
              strokeOpacity="0.64"
              strokeWidth="0.5"
            />
            <path
              d="M140.56 107.823C139.658 113.524 133.867 118.1 125.13 120.855C116.405 123.606 104.798 124.522 92.379 122.942C79.96 121.362 69.0951 117.587 61.5684 112.768C54.0306 107.942 49.8878 102.103 50.7899 96.4017C51.692 90.7005 57.4826 86.1252 66.2201 83.3699C74.9447 80.6187 86.5517 79.7032 98.9706 81.2833C111.39 82.8634 122.254 86.6381 129.781 91.457C137.319 96.283 141.462 102.122 140.56 107.823Z"
              stroke="black"
              strokeOpacity="0.64"
              strokeWidth="0.5"
            />
            <ellipse
              rx="44.9924"
              ry="21.4331"
              transform="matrix(-0.43919 0.898394 -0.913566 -0.40669 148.402 75.341)"
              fill="none"
            />
            <path
              d="M128.708 115.627C123.384 113.257 120.704 106.634 120.736 97.7565C120.769 88.8908 123.51 77.8318 128.959 66.6854C134.408 55.539 141.527 46.4288 148.625 40.7085C155.733 34.9804 162.773 32.6849 168.097 35.0548C173.42 37.4247 176.101 44.0477 176.069 52.9255C176.036 61.7912 173.295 72.8502 167.846 83.9966C162.397 95.143 155.278 104.253 148.18 109.973C141.072 115.702 134.032 117.997 128.708 115.627Z"
              stroke="black"
              strokeOpacity="0.64"
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <div className="h-full p-6 sm:p-12 lg:p-20">{children}</div>
      </div>
    </React.Fragment>
  )
}

export default Layout
