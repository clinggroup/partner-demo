export default function Container({ title, text, disabled, children }) {
  return (
    <div
      className={`bg-white w-full rounded-lg shadow-lg border border-gray-300 mb-8 max-w-5xl mx-auto ${
        disabled ? 'pointer-events-none opacity-30' : ''
      }`}
    >
      <div className="flex w-full items-start p-6">
        <div className="flex-auto">
          <div className="text-xl font-semibold mb-2">{title}</div>
          <div className="text-gray-500 text-sm">{text}</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}
