const MessageArea = ({ children }) => {
  return (
    <div className="text-md max-w-lg overflow-hidden overflow-ellipsis">
      {children}
    </div>
  )
}

export default MessageArea
