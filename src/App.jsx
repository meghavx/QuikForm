import React from 'react';
import FieldPalette from './components/FieldPalette';
import Canvas from './components/Canvas';
import FieldEditor from './components/FieldEditor';

export default function App() {
  return (
    <div className="flex h-screen">
      <FieldPalette />
      <Canvas />
      <FieldEditor />
    </div>
  )
}