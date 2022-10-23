import ArrowRightIcon from "@heroicons/react/outline/ArrowRightIcon"
import { CSSProperties, ReactNode } from "react"

export type ButtonProps = (
  | ({ as?: "button" } & React.ComponentPropsWithoutRef<"button">)
  | ({ as: "a" } & React.ComponentPropsWithoutRef<"a">)
) &
  (
    | {
        /** Needed for animation. */
        width: number
        variant?: "primary"
      }
    | {
        width?: number
        variant: "secondary"
      }
  )

export function Button({
  className = "",
  style,
  children,
  variant = "primary",
  ...rest
}: ButtonProps) {
  let content: ReactNode

  className += " px-4 font-semibold py-3 text-xl md:py-4 md:px-6"

  switch (variant) {
    case "primary":
      let width: number
      ;({ width = 0, ...rest } = rest)
      style = { ...style, width }

      className +=
        " cursor-pointer group flex flex-row whitespace-nowrap h-full items-center justify-center" +
        " rounded-full border-2 border-black bg-action hover:text-background hover:bg-black"

      content = (
        <div className="flex pt-1">
          <ArrowRightIcon
            style={{ "--translateX": width - 48 - 24 - 3 + "px" } as {}}
            className="transition transform group-hover:translate-x-[var(--translateX)] motion-reduce:transition-none motion-reduce:group-hover:transform-none w-6 h-6 stroke-1.5"
          />
          <span className="transition transform group-hover:-translate-x-6 motion-reduce:transition-none motion-reduce:group-hover:transform-none ml-1 group-hover:ml-0">
            {children}
          </span>
        </div>
      )

      break
    case "secondary":
      className += " hover:underline hover:decoration-wavy underline-offset-4"
      content = children
      break
  }

  if (rest.as === "a") {
    return (
      <a {...rest} style={style} className={className}>
        {content}
      </a>
    )
  }

  return (
    <button {...rest} style={style} className={className}>
      {content}
    </button>
  )
}
