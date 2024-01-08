import clsx from "clsx"

const Badge = ({ children, Hoverable }) => {
  const badgeClasses = clsx(
    "mr-1",
    "inline-flex",
    "w-fit",
    "items-center",
    "rounded-md",
    "border-2",
    "dark:border-white",
    "px-2.5",
    "py-0.5",
    "text-sm",
    "font-bold",
    "transition-colors",
    "mt-1",
    "border-black",
    Hoverable && "dark:hover:text-black dark:hover:bg-white",
  )

  return <div className={badgeClasses}>{children}</div>
}

export default Badge
