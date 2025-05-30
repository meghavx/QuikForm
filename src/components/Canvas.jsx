import React from 'react'
import { useFormStore } from '../store/useFormStore'
import { useDroppable } from '@dnd-kit/core'

export default function Canvas() {
  const fields = useFormStore((s) => s.fields)
  const setSelectedField = useFormStore((s) => s.setSelectedField)
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' })

  return (
    <div
      ref={setNodeRef}
      className={`w-2/4 p-4 transition-all border-r min-h-screen ${
        isOver ? 'bg-green-100' : ''
      }`}
    >
      {fields.length === 0 && (
        <div className="text-gray-400 text-center mt-10">
          Drag a field here to start building your form
        </div>
      )}
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
