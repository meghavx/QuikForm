import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export const useFormStore = create(
  persist(
    (set) => ({
      fields: [],
      selectedFieldId: null,

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
          'Button': 'button',
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

      preview: false,

      togglePreview: () =>
        set((state) => ({
          preview: !state.preview,
        })),  

      shareableLink: '',

      generateShareLink: () =>
        set((state) => {
          const encoded = encodeURIComponent(JSON.stringify(state.fields))
          const link = `${window.location.origin}/shared?data=${encoded}`
          return { shareableLink: link }
        }),  
    }),
    {
      name: 'form-builder-store',
    }
  )
)
