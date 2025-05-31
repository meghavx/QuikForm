import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { GripVertical } from 'lucide-react'

const fieldTypes = [
  'Header', 
  'Text', 
  'Textarea', 
  'Email', 
  'Date', 
  'Dropdown', 
  'Checkbox Group', 
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
      className={`flex items-center gap-4 w-full mb-2 px-3 py-1 font-semibold rounded cursor-move transition-colors duration-200 ${
        isDragging
          ? 'bg-[#311B92] text-[#8F94FB]'
          : 'bg-[#8F94FB] text-[#311B92] hover:bg-[#311B92] hover:text-[#8F94FB]'
      }`}
    >
      <GripVertical className="w-4 h-4 opacity-70" />
      <span>{id}</span>
    </div>
  )
}
