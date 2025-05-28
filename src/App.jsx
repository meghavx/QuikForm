import React from 'react';
import FieldPalette from './components/FieldPalette';
import Canvas from './components/Canvas';
import FieldEditor from './components/FieldEditor';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <FieldPalette />
        <Canvas />
        <FieldEditor />
      </div>
    </>
  )
}