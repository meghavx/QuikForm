import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { nanoid } from 'nanoid'

export const useFormStore = create(
  persist(
    (set, get) => {
      const autosave = (updatedFields) => {
        const formId = get().formId
        if (formId) {
          localStorage.setItem(
            `shared-form-${formId}`,
            JSON.stringify(updatedFields)
          )
        }
      }

      return {
        formId: null,
        fields: [],
        selectedFieldId: null,
        preview: false,
        shareableLink: '',

        addField: (type) => {
          const id = uuidv4()

          const inputTypeMap = {
            'Header': 'header',
            'Subheader': 'subheader',
            'Text': 'text',
            'Textarea': 'textarea',
            'Email': 'email',
            'Date': 'date',
            'Number': 'number',
            'Dropdown': 'select',
            'Radio Group': 'radio',
            'Checkbox Group': 'checkbox',
            'URL': 'url',
            'File Upload': 'file',
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

          set((state) => {
            const updatedFields = [...state.fields, newField]
            autosave(updatedFields)
            return { fields: updatedFields }
          })
        },

        updateField: (id, updates) => {
          set((state) => {
            const updatedFields = state.fields.map((f) =>
              f.id === id ? { ...f, ...updates } : f
            )
            autosave(updatedFields)
            return { fields: updatedFields }
          })
        },

        reorderFields: (newFields) => {
          set(() => {
            autosave(newFields)
            return { fields: newFields }
          })
        },

        setSelectedField: (id) => set({ selectedFieldId: id }),

        deleteField: (id) => {
          set((state) => {
            const updatedFields = state.fields.filter((f) => f.id !== id)
            autosave(updatedFields)
            return {
              fields: updatedFields,
              selectedFieldId: state.selectedFieldId === id ? null : state.selectedFieldId,
            }
          })
        },

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
          const link = `${window.location.origin}/forms/shared/${formId}`
          set({ shareableLink: link })
          return formId
        },

        clearForm: () => {
          const formId = get().formId
          if (formId) {
            localStorage.removeItem(`shared-form-${formId}`)
          }

          set({
            fields: [],
            selectedFieldId: null,
            formId: null,
            shareableLink: ''
          })
        },
      }
    },
    {
      name: 'form-builder-store',
    }
  )
)
