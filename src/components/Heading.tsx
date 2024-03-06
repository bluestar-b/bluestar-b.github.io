import ThemeToggler from "./theme/ThemeToggler"
const Heading = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <div className="text-lg  font-bold">bluestar</div>
        <div className="text-sm">I create bugs🤯</div>
      </div>
      <div className="flex items-center">
        <div className="inline">
          <div>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Heading
