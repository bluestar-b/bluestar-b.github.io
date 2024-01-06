const MessageArea = ({ children }) => {
  return (
    <div className=" text-md max-w-lg space-x-4 overflow-hidden overflow-ellipsis">
      {children}
    </div>
  )
}

export default MessageArea
