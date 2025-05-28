import React from 'react'
import { useFormStore } from '../store/useFormStore'

const fieldTypes = ['Text', 'Textarea', 'Dropdown', 'Checkbox', 'Radio Button', 'Date']

export default function FieldPalette() {
  const addField = useFormStore((s) => s.addField)

  return (
    <div className="w-1/4 p-4 border-r">
      <h2 className="text-lg font-semibold mb-2">Add Field</h2>
      {fieldTypes.map((type) => (
        <button
          key={type}
          className="block w-full mb-2 bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => addField(type)}
        >
          {type}
        </button>
      ))}
    </div>
  )
}
