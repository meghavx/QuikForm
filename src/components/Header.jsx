import React from 'react'
import { useFormStore } from '../store/useFormStore'
import { Eye, EyeOff } from 'lucide-react'

export default function Header() {
  const preview = useFormStore((s) => s.preview)
  const togglePreview = useFormStore((s) => s.togglePreview)

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

      <div className="ml-auto">
        <button
          onClick={togglePreview}
          className="flex items-center gap-2 px-4 py-2 bg-[#8F94FB] text-[#311B92] border border-[#311B92] font-medium rounded shadow hover:brightness-95 transition"
          title={preview ? 'Exit Preview' : 'Preview Form'}
        >
          {preview ? <EyeOff size={20} /> : <Eye size={20} />}
          {preview ? 'Exit Preview' : 'Preview Form'}
        </button>
      </div>
    </header>
  )
}
