import React from 'react'
import FormBuilder from './pages/FormBuilder'
import FormPreview from './pages/FormPreview'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/forms/:formId" element={<FormPreview />} />
      </Routes>
    </Router>
  )
}
