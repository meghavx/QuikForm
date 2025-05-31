import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function FormPreview() {
  const { formId } = useParams()
  const [fields, setFields] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(`shared-form-${formId}`)
    if (saved) {
      setFields(JSON.parse(saved))
    }
  }, [formId])

  const handleResetForm = (e) => {
    e.preventDefault()
    const form = document.querySelector('form')
    if (form) {
      form.reset()
    }
  }

  if (!fields || fields.length === 0) {
    return <div className="p-8 text-center text-gray-500">No form found.</div>
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <form className="space-y-4">
        {fields.map((field) => {
          const { id, label, inputType, placeholder, options, type } = field

          if (type === 'Header') {
            return (
              <div key={id}>
                <h2 className="text-3xl font-bold text-center my-4">{label}</h2>
              </div>
            )
          }

          if (type === 'Radio Group') {
            return (
              <div key={id}>
                <label className="block font-medium mb-1">{label}</label>
                <div className="space-y-1 pl-2">
                  {options.map((opt, idx) => (
                    <div key={idx}>
                      <label className="inline-flex items-center">
                        <input type="radio" name={id} className="mr-2" />
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          if (type === 'Checkbox Group') {
            return (
              <div key={id}>
                <label className="block font-medium mb-1">{label}</label>
                <div className="space-y-1 pl-2">
                  {options.map((opt, idx) => (
                    <div key={idx}>
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="mr-2" />
                        {opt}
                      </label>
                    </div>
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
                  className="w-full border rounded p-2"
                  placeholder={placeholder}
                />
              ) : inputType === 'select' ? (
                <select className="w-full border rounded p-2">
                  {options.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={inputType}
                  placeholder={placeholder}
                  className="w-full border rounded p-2"
                />
              )}
            </div>
          )
        })}

        {/* Submit Button and Reset Form option */}
        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="w-24 px-4 py-2 font-medium rounded border border-[#311B92] bg-[#F0EBF8] text-[#311B92]"
          >
            Submit
          </button>
          <button
            onClick={handleResetForm}
            className="text-l text-[#311B92] font-semibold hover:underline"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  )
}
