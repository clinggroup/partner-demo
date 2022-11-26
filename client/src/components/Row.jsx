import React from 'react'

export default function Row({ title, children }) {
  return (
    <div className="flex space-between px-6 py-4 border-t">
      <div className="flex-auto pt-1">{title}</div>
      <div className="flex">{children}</div>
    </div>
  )
}
