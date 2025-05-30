import React from 'react'
import { useDraggable } from '@dnd-kit/core'

const fieldTypes = [
  'Header', 
  'Text', 
  'Textarea', 
  'Email', 
  'Date', 
  'Dropdown', 
  'Checkbox', 
  'Radio Group', 
  'Number', 
  'Button', 
  'File Upload'
]

export default function FieldPalette() {
  return (
    <div className="w-1/4 p-4 border-r">
      {fieldTypes.map((type) => (
        <DraggableField key={type} id={type} />
      ))}
    </div>
  )
}

function DraggableField({ id }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { type: id },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`block w-full mb-2 px-3 py-1 text-white text-center rounded cursor-move ${
        isDragging ? 'bg-blue-700' : 'bg-blue-500'
      }`}
    >
      {id}
    </div>
  )
}
