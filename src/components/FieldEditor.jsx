import React from 'react'
import { useFormStore } from '../store/useFormStore'

export default function FieldEditor() {
  const fields = useFormStore((s) => s.fields)
  const selectedFieldId = useFormStore((s) => s.selectedFieldId)
  const updateField = useFormStore((s) => s.updateField)

  const field = fields.find((f) => f.id === selectedFieldId)
  if (!field) return <div className="w-1/4 p-4">Select a field to edit</div>

  return (
    <div className="w-1/4 p-4">
      <h2 className="text-lg font-semibold mb-2">Edit Field</h2>
      <input
        value={field.label}
        onChange={(e) => updateField(field.id, { label: e.target.value })}
        className="w-full border mb-2 px-2 py-1"
        placeholder="Label"
      />
      <input
        value={field.placeholder}
        onChange={(e) =>
          updateField(field.id, { placeholder: e.target.value })
        }
        className="w-full border mb-2 px-2 py-1"
        placeholder="Placeholder"
      />
      <label className="block">
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
    </div>
  )
}
