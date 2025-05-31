import React from 'react'
import { useFormStore } from '../store/useFormStore'

export default function FieldEditor() {
  const fields = useFormStore((s) => s.fields)
  const selectedFieldId = useFormStore((s) => s.selectedFieldId)
  const updateField = useFormStore((s) => s.updateField)
  const deleteField = useFormStore((s) => s.deleteField)

  const field = fields.find((f) => f.id === selectedFieldId)
  if (!field) return <div className="w-1/4 p-4">Select a field to edit</div>

  const handleOptionChange = (index, value) => {
    const newOptions = [...field.options]
    newOptions[index] = value
    updateField(field.id, { options: newOptions })
  }

  const addOption = () => {
    updateField(field.id, { options: [...(field.options || []), ''] })
  }

  const removeOption = (index) => {
    const newOptions = field.options.filter((_, i) => i !== index)
    updateField(field.id, { options: newOptions })
  }

  const showPlaceholder = !['header', 'select', 'checkbox', 'radio', 'button', 'file'].includes(field.inputType)
  const showOptions = ['select', 'radio', 'checkbox'].includes(field.inputType)

  return (
    <div className="w-1/4 p-4">
      <h2 className="text-lg font-semibold mb-2">Edit Field</h2>

      <input
        value={field.label}
        onChange={(e) => updateField(field.id, { label: e.target.value })}
        className="w-full border mb-2 px-2 py-1"
        placeholder="Label"
      />

      {showPlaceholder && (
        <input
          value={field.placeholder}
          onChange={(e) =>
            updateField(field.id, { placeholder: e.target.value })
          }
          className="w-full border mb-2 px-2 py-1"
          placeholder="Placeholder"
        />
      )}

      <label className="block mb-2">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) =>
            updateField(field.id, { required: e.target.checked })
          }
          className="mr-2"
        />
        Required
      </label>

      {showOptions && (
        <div className="mb-2">
          <label className="font-medium block mb-1">Options:</label>
          {field.options.map((opt, index) => (
            <div key={index} className="flex items-center mb-1">
              <input
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 border px-2 py-1 mr-2"
              />
              <button
                onClick={() => removeOption(index)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={addOption}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            + Add Option
          </button>
        </div>
      )}

      <button
        onClick={() => {
          if (confirm('This action will delete this field.')) {
            deleteField(field.id)
          }
        }}
        className="mt-4 bg-gray-400 text-sm px-2 py-1 rounded hover:bg-gray-500"
      >
        Delete Field
      </button>
    </div>
  )
}
