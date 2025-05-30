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
          'Checkbox': 'checkbox',
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
          options: ['Dropdown', 'Radio Group', 'Checkbox'].includes(type) ? ['Option 1'] : [],
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

    }),
    {
      name: 'form-builder-store',
    }
  )
)