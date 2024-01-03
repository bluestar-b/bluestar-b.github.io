const MessageArea = ({ children }) => {
  return (
    <div className=" space-x-4 text-md max-w-md md:max-w-lg overflow-hidden overflow-ellipsis">
      {children}
    </div>
  )
}

export default MessageArea
