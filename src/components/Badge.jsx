import clsx from "clsx"

const Badge = ({ children, Hoverable }) => {
  const badgeClasses = clsx(
    "mr-1",
    "inline-flex",
    "w-fit",
    "items-center",
    "rounded-md",
    "border-2",
    "px-2.5",
    "py-0.5",
    "text-sm",
    "font-bold",
    "transition-colors",
    "mt-1",
    Hoverable && "hover:text-black hover:bg-white",
  )

  return <div className={badgeClasses}>{children}</div>
}

export default Badge
