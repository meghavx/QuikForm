import React, { useState } from 'react'
import { useFormStore } from '../store/useFormStore'
import { Eye, EyeOff, Share2 } from 'lucide-react'
import ShareModal from './ShareModal'

export default function Header() {
  const preview = useFormStore((s) => s.preview)
  const togglePreview = useFormStore((s) => s.togglePreview)
  const generateShareLink = useFormStore((s) => s.generateShareLink)
  const [showModal, setShowModal] = useState(false)

  const handleShare = () => {
    generateShareLink()
    setShowModal(true)
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
        {preview && (
          <button
            onClick={handleShare}
            className="px-2 py-2 text-[#311B92] transition hover:scale-105"
            title="Share Form"
          >
            <Share2 size={22} />
          </button>
        )}

        <button
          onClick={togglePreview}
          className="px-4 py-2 text-[#311B92] transition hover:scale-105"
          title={preview ? 'Exit Preview' : 'Preview Form'}
        >
          {preview ? <EyeOff size={22} /> : <Eye size={22} />}
        </button>
      </div>

      {showModal && <ShareModal onClose={() => setShowModal(false)} />}
    </header>
  )
}
