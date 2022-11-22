export default function Navbar() {
  return (
    <div className="w-full bg-primary-700 py-6 px-8 flex justify-between shadow-xl border-b border-primary-500">
      <div className="h-10 bg-white bg-opacity-10 w-36 rounded-full"></div>
      <div className="flex gap-3">
        <button className="h-10 w-10 rounded-full bg-white bg-opacity-10 pointer-events-none" />
        <button className="h-10 w-10 rounded-full bg-white bg-opacity-10 pointer-events-none" />
        <button className="h-10 w-10 rounded-full bg-white bg-opacity-10 pointer-events-none" />
      </div>
    </div>
  )
}
