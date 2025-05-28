import React from 'react'
import { useFormStore } from '../store/useFormStore'

export default function Canvas() {
  const fields = useFormStore((s) => s.fields)
  const setSelectedField = useFormStore((s) => s.setSelectedField)

  return (
    <div className="w-2/4 p-4 border-r">
      <h2 className="text-lg font-semibold mb-2">Form Canvas</h2>
      {fields.map((field) => (
        <div
          key={field.id}
          className="p-2 border mb-2 rounded cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedField(field.id)}
        >
          <label className="block font-medium">{field.label}</label>
          <input
            className="w-full border px-2 py-1"
            placeholder={field.placeholder}
            disabled
          />
        </div>
      ))}
    </div>
  )
}
