import { useState } from "react"

const Dialog = ({ children, image }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleWrapperClick = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <div onClick={handleWrapperClick}>{children}</div>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="fixed inset-0 bg-black opacity-45"></div>
          <div className="relative z-20 w-full max-w-md  p-4">
            <img className="rounded-lg" src={image} alt="lightbox img" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dialog
