export const Card: React.FC<any> = ({ children }) => {
  return (
    <div className="bg-white border-2 border-black rounded-xl p-10 w-5/6 md:w-2/3 lg:w-1/2">
      {children}
    </div>
  )
}
