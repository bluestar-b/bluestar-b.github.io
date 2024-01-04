const MessageArea = ({ children }) => {
  return (
    <div className=" text-md max-w-md space-x-4 overflow-hidden overflow-ellipsis md:max-w-lg">
      {children}
    </div>
  )
}

export default MessageArea
