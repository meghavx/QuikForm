import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormStore } from '../store/useFormStore'
import ShareModal from '../components/ShareModal'
import { Share2, EyeOff } from 'lucide-react'

export default function FormPreview() {
  const { formId } = useParams()
  const navigate = useNavigate()
  const [fields, setFields] = useState([])
  const generateShareLink = useFormStore((s) => s.generateShareLink)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(`shared-form-${formId}`)
    if (saved) {
      setFields(JSON.parse(saved))
    }
  }, [formId])

  if (!fields || fields.length === 0) {
    return <div className="p-8 text-center text-gray-500">No form found.</div>
  }

  const handleShare = () => {
    generateShareLink()
    setShowModal(true)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-end mb-4">
        <div className="flex gap-6">
          <button
            title="Share Form"
            onClick={(handleShare)}
            className="text-[#311B92] hover:opacity-75"
          >
            <Share2 size={21}/>
          </button>
          <button
            title="Exit Preview"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:opacity-75"
          >
            <EyeOff size={21}/>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {fields.map((field) => {
          const { id, label, inputType, placeholder, options = [] } = field

          if (inputType === 'header') {
            return (
              <div key={id}>
                <h2 className="text-4xl font-semibold text-center mt-2 mb-6">{label}</h2>
              </div>
            )
          }

          if (inputType === 'subheader') {
            return (
              <div key={id}>
                <h2 className="text-sm text-justify italic mb-8">{label}</h2>
              </div>
            )
          }

          if (inputType === 'radio' || inputType === 'checkbox') {
            return (
              <div key={id}>
                <label className="block font-medium mb-1">{label}</label>
                <div className="space-y-1 pl-2">
                  {options.map((opt, idx) => (
                    <label key={idx} className="inline-flex items-center mr-4 opacity-60">
                      <input
                        type={inputType}
                        value={opt}
                        disabled
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <div key={id}>
              <label className="block font-medium mb-1">{label}</label>
              {inputType === 'textarea' ? (
                <textarea
                  disabled
                  className="w-full border rounded p-2 bg-gray-100"
                  placeholder={placeholder}
                />
              ) : inputType === 'select' ? (
                <select
                  disabled
                  className="w-full border rounded p-2 bg-gray-100"
                >
                  <option>Select an option</option>
                  {options.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={inputType}
                  disabled
                  placeholder={placeholder}
                  className="w-full border rounded p-2 bg-gray-100"
                />
              )}
            </div>
          )
        })}
      </div>

      {showModal && <ShareModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
