import React from 'react'
import { useFormStore } from '../store/useFormStore'
import { useDroppable } from '@dnd-kit/core'

export default function Canvas() {
  const fields = useFormStore((s) => s.fields)
  const setSelectedField = useFormStore((s) => s.setSelectedField)
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' })
  const preview = useFormStore((s) => s.preview)

  const renderInput = (field) => {
    const commonProps = {
      className: 'w-full border px-2 py-1',
      placeholder: field.placeholder,
      disabled: !preview,
    }
  
    switch (field.inputType) {
      case 'header':
        return <h1 className="text-4xl font-semibold text-center">{field.label}</h1>
      case 'subheader':
        return <h3 className="text-sm text-justify italic">{field.label}</h3>  
      case 'textarea':
        return <textarea {...commonProps} />
      case 'select':
        return (
          <select {...commonProps}>
            {field.options.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        )
      case 'radio':
        return field.options.map((opt, i) => (
          <label key={i} className="block">
            <input 
              type="radio" 
              name={field.id} 
              className="mr-2" 
              disabled={!preview} 
            />
            {opt}
          </label>
        ))
      case 'checkbox':
        return field.options.map((opt, i) => (
          <label key={i} className="block">
            <input 
              type="checkbox" 
              name={field.id} 
              className="mr-2" 
              disabled={!preview} 
            />
            {opt}
          </label>
        ))
      default:
        return <input type={field.inputType} {...commonProps} />
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={`w-2/4 p-4 transition-all border-r h-[calc(100vh-72px)] overflow-y-auto ${
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
          {!['header', 'subheader', 'button'].includes(field.inputType) && (
            <label className="block font-medium">{field.label}</label>
          )}
          {renderInput(field)}
        </div>
      ))}
    </div>
  )
}
