import React from 'react'
import { useFormStore } from '../store/useFormStore'
import { useDroppable } from '@dnd-kit/core'

export default function Canvas() {
  const fields = useFormStore((s) => s.fields)
  const setSelectedField = useFormStore((s) => s.setSelectedField)
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' })

  const renderInput = (field) => {
    switch (field.inputType) {
      case 'textarea':
        return (
          <textarea
            className="w-full border px-2 py-1"
            placeholder={field.placeholder}
            disabled
          />
        )
      case 'select':
        return (
          <select className="w-full border px-2 py-1" disabled>
            {field.options.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        )
      case 'checkbox':
        return field.options.map((opt, i) => (
          <label key={i} className="block">
            <input type="checkbox" name={field.id} className="mr-2" disabled />
            {opt}
          </label>
        ))
      case 'radio':
        return field.options.map((opt, i) => (
          <label key={i} className="block">
            <input type="radio" name={field.id} className="mr-2" disabled />
            {opt}
          </label>
        ))
      case 'file':
        return <input type="file" className="w-full border px-2 py-1" disabled />
      case 'button':
        return (
          <button className="px-3 py-1 bg-gray-300 rounded" disabled>
            {field.label}
          </button>
        )
      case 'header':
        return <h3 className="text-xl font-bold">{field.label}</h3>
      default:
        return (
          <input
            type={field.inputType}
            className="w-full border px-2 py-1"
            placeholder={field.placeholder}
            disabled
          />
        )
    }
  }

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
          {!['header', 'button'].includes(field.inputType) && (
            <label className="block font-medium">{field.label}</label>
          )}
          {renderInput(field)}
        </div>
      ))}
    </div>
  )
}
