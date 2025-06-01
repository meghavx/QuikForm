import React from 'react'
import { useFormStore } from '../store/useFormStore'
import { Eye, Eraser } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const clearForm = useFormStore((s) => s.clearForm)
  const fields = useFormStore((s) => s.fields)
  const formId = useFormStore((s) => s.formId)
  const generateShareLink = useFormStore((s) => s.generateShareLink)
  const navigate = useNavigate()

  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to discard all fields? This action cannot be undone.')
    if (confirmed) {
      clearForm()
    }
  }

  const handlePreview = () => {
    // Ensure formId exists
    const id = formId || generateShareLink() // returns id from store
    navigate(`/forms/preview/${id}`)
  }

  return (
    <header
      className="flex items-center px-6 py-4"
      style={{ backgroundColor: "#8F94FB" }}
    >
      <img
        src="logo.png"
        alt="App Logo"
        className="w-10 h-10 object-contain"
      />
      <h2
        className="text-2xl font-bold ml-4"
        style={{ color: "#311B92" }}
      >
        QuikForm
      </h2>

      <div className="ml-auto flex items-center gap-3">
        <button
          title="Clear Form"
          onClick={handleClear}
          disabled={fields.length === 0}
          className={`px-2 py-2 ${fields.length > 0 
            ? "text-[#311B92] transition hover:scale-105" 
            : "text-gray-500"
          }`}
        >
          <Eraser size={21} />
        </button>

        <button
          title="Preview Form"
          onClick={handlePreview}
          disabled={fields.length === 0}
          className={`px-2 py-2 ${fields.length > 0 
            ? "text-[#311B92] transition hover:scale-105" 
            : "text-gray-500"
          }`}
        >
          <Eye size={21} />
        </button>
      </div>
    </header>
  )
}
