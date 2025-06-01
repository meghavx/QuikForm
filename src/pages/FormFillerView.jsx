import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function FormFillerView() {
  const { formId } = useParams()
  const [fields, setFields] = useState([])
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem(`shared-form-${formId}`)
    if (saved) {
      const parsedFields = JSON.parse(saved)
      setFields(parsedFields)

      const initialValues = {}
      const initialErrors = {}
      parsedFields.forEach((f) => {
        if (f.inputType === 'checkbox') {
          initialValues[f.id] = []
        } else {
          initialValues[f.id] = ''
        }
        initialErrors[f.id] = ''
      })
      setValues(initialValues)
      setErrors(initialErrors)
    }
  }, [formId])

  const handleResetForm = (e) => {
    e.preventDefault()
    const resetValues = {}
    const resetErrors = {}
    fields.forEach((f) => {
      resetValues[f.id] = f.inputType === 'checkbox' ? [] : ''
      resetErrors[f.id] = ''
    })
    setValues(resetValues)
    setErrors(resetErrors)
  }

  const validateField = (field, value) => {
    const { inputType, required, minLength, maxLength, pattern } = field

    if (required && (Array.isArray(value) ? value.length === 0 : !value.trim())) {
      return 'This field is required.'
    }

    if (minLength && value.length < minLength) {
      return `Minimum length is ${minLength}`
    }

    if (maxLength && value.length > maxLength) {
      return `Maximum length is ${maxLength}`
    }

    if (pattern) {
      const regex = new RegExp(pattern)
      if (!regex.test(value)) {
        return 'Invalid format.'
      }
    }

    if (inputType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Invalid email address.'
      }
    }

    if (inputType === 'tel') {
      const phoneRegex = /^[0-9+\-()\s]{7,15}$/
      if (!phoneRegex.test(value)) {
        return 'Invalid phone number.'
      }
    }
    return ''
  }

  const handleChange = (e, field) => {
    const { id, inputType } = field
    let value = e.target.value

    if (inputType === 'checkbox') {
      const checked = e.target.checked
      const optionValue = e.target.value
      const currentValues = values[id] || []

      value = checked
        ? [...currentValues, optionValue]
        : currentValues.filter((v) => v !== optionValue)
    }

    setValues((prev) => ({ ...prev, [id]: value }))
    const error = validateField(field, value)
    setErrors((prev) => ({ ...prev, [id]: error }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    let hasError = false

    fields.forEach((field) => {
      const error = validateField(field, values[field.id])
      if (error) hasError = true
      newErrors[field.id] = error
    })

    setErrors(newErrors)

    if (!hasError) {
      alert('Form submitted successfully!')
      console.log('Submitted values:', values)
    }
  }

  if (!fields || fields.length === 0) {
    return <div className="p-8 text-center text-gray-500">No form found.</div>
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
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

          if (inputType === 'radio') {
            return (
              <div key={id}>
                <label className="block font-medium mb-1">{label}</label>
                <div className="space-y-1 pl-2">
                  {options.map((opt, idx) => (
                    <label key={idx} className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        name={id}
                        value={opt}
                        checked={values[id] === opt}
                        onChange={(e) => handleChange(e, field)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {errors[id] && (
                  <p className="text-sm text-red-500 mt-1">{errors[id]}</p>
                )}
              </div>
            )
          }

          if (inputType === 'checkbox') {
            return (
              <div key={id}>
                <label className="block font-medium mb-1">{label}</label>
                <div className="space-y-1 pl-2">
                  {options.map((opt, idx) => (
                    <label key={idx} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        value={opt}
                        checked={(values[id] || []).includes(opt)}
                        onChange={(e) => handleChange(e, field)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {errors[id] && (
                  <p className="text-sm text-red-500 mt-1">{errors[id]}</p>
                )}
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
                  value={values[id]}
                  onChange={(e) => handleChange(e, field)}
                />
              ) : inputType === 'select' ? (
                <select
                  className="w-full border rounded p-2"
                  value={values[id]}
                  onChange={(e) => handleChange(e, field)}
                >
                  <option value="">Select an option</option>
                  {options.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={inputType}
                  placeholder={placeholder}
                  className="w-full border rounded p-2"
                  value={values[id]}
                  onChange={(e) => handleChange(e, field)}
                />
              )}
              {errors[id] && (
                <p className="text-sm text-red-500 mt-1">{errors[id]}</p>
              )}
            </div>
          )
        })}

        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="w-24 px-4 py-2 font-medium rounded border border-[#311B92] bg-[#F0EBF8] text-[#311B92] hover:opacity-80 transition-opacity"
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
