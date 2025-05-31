import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { nanoid } from 'nanoid'

export const useFormStore = create(
  persist(
    (set, get) => ({
      formId: null,
      fields: [],
      selectedFieldId: null,
      preview: false,
      shareableLink: '',

      addField: (type) => {
        const id = uuidv4()

        const inputTypeMap = {
          'Text': 'text',
          'Email': 'email',
          'Date': 'date',
          'Number': 'number',
          'File Upload': 'file',
          'Checkbox Group': 'checkbox',
          'Radio Group': 'radio',
          'Textarea': 'textarea',
          'Dropdown': 'select',
          'Header': 'header'
        }

        const inputType = inputTypeMap[type] || 'text'

        const newField = {
          id,
          type,
          label: `${type} field`,
          required: false,
          placeholder: '',
          options: ['Dropdown', 'Radio Group', 'Checkbox Group'].includes(type) ? ['Option 1'] : [],
          inputType
        }

        set((state) => ({ fields: [...state.fields, newField] }))
      },

      updateField: (id, updates) => {
        set((state) => ({
          fields: state.fields.map((f) =>
            f.id === id ? { ...f, ...updates } : f
          ),
        }))
      },

      reorderFields: (newFields) => set({ fields: newFields }),

      setSelectedField: (id) => set({ selectedFieldId: id }),

      deleteField: (id) =>
        set((state) => ({
          fields: state.fields.filter((field) => field.id !== id),
          selectedFieldId: state.selectedFieldId === id ? null : state.selectedFieldId,
        })),

      togglePreview: () =>
        set((state) => ({
          preview: !state.preview,
        })),

      generateShareLink: () => {
        const state = get()
        let formId = state.formId
        if (!formId) {
          formId = nanoid(8)
          set({ formId })
        }
        localStorage.setItem(`shared-form-${formId}`, JSON.stringify(state.fields))
        const link = `${window.location.origin}/forms/${formId}`
        set({ shareableLink: link })
      },

      clearForm: () =>
        set({
          fields: [],
          selectedFieldId: null,
          formId: null,
          shareableLink: ''
        }),
    }),
    {
      name: 'form-builder-store',
    }
  )
)
