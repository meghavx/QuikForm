import React, { useState } from 'react'
import { useFormStore } from '../store/useFormStore'
import { X, Copy, Check } from 'lucide-react'

export default function ShareModal({ onClose }) {
  const link = useFormStore((s) => s.shareableLink)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
        <h3 className="text-lg font-bold mb-4 text-[#311B92]">Share Form</h3>
        <p className="text-sm mb-2">Copy and share this link:</p>
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded">
          <input
            readOnly
            className="flex-1 bg-transparent text-sm outline-none"
            value={link}
          />
          <button
            onClick={copyToClipboard}
            className="text-[#311B92] flex items-center gap-1"
          >
            {copied
                ? <><Check size={18} /> Copied</>
                : <><Copy size={18} /> Copy Link</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
