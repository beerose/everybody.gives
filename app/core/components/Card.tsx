export const Card: React.FC<any> = ({ children }) => {
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="bg-white border-2 border-black rounded-xl p-10 w-full sm:w-5/6 md:w-2/3 lg:w-1/2">
        {children}
      </div>
    </div>
  )
}
