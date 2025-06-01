import React from 'react'
import FieldPalette from '../components/FieldPalette'
import Canvas from '../components/Canvas'
import FieldEditor from '../components/FieldEditor'
import Header from '../components/Header'
import { useFormStore } from '../store/useFormStore'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'

export default function FormBuilder() {
  const sensors = useSensors(useSensor(PointerSensor))
  const addField = useFormStore((s) => s.addField)
 
  const handleDragEnd = (event) => {
    const { over, active } = event
    if (over?.id === 'canvas' && active?.data?.current?.type) {
      addField(active.data.current.type)
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Header />
      <div className="flex h-screen justify-center">
        <FieldPalette />
        <Canvas />
        <FieldEditor />
      </div>
    </DndContext>
  )
}
