import React, { ReactElement } from 'react'

export default function CustomTooltip({
  active,
  payload,
  label
}) {
  if (active && payload && payload.length && label) {
    return (
      <div className="bg-dark3 p-4 text-sm">
        <p className="mb-0 font-bold pb-2">{`${label}`}</p>
        {payload.map((item, index) => (
          <p key={index} className="mb-0 font-normal">{`${item.name}: ${item.value}`}</p>
        ))}
      </div>
    )
  }

  return null
}
