import React from 'react'
import FormBuilder from './pages/FormBuilder'
import FormFillerView from './pages/FormFillerView'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/forms/shared/:formId" element={<FormFillerView />} />
      </Routes>
    </Router>
  )
}
