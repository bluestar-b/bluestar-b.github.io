const MessageArea = ({ children }) => {
  return (
    <div className="text-md max-w-lg overflow-hidden overflow-ellipsis lg:max-w-lg">
      {children}
    </div>
  )
}

export default MessageArea
