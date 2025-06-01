# QuikForm

A sleek, drag-and-drop form builder built with React, Zustand, TailwindCSS, and dnd-kit. It lets users visually build forms, preview them, save them locally, and share them via unique URLs — all without a backend.

🔗 **Live Demo**: [https://quikform.netlify.app](https://quikform.netlify.app)

---

## 🚀 Features

* 🧩 **Drag & Drop Builder** — Add fields effortlessly using an intuitive drag-and-drop interface.
* 🛠️ **Diverse Field Types** — Supports headers, text inputs, dropdowns, radios, checkboxes, file uploads, and more.
* 🔍 **Preview Mode** — Instantly preview your form before sharing.
* 💾 **Local Save** — Save forms in your browser’s localStorage.
* 🔗 **Sharable Link** — Generate a unique share link for each form.
* 🗑️ **Form Reset** — Start over with a clean slate anytime.
* ✨ **Lightweight & Fast** — Built with Vite for lightning-fast development and builds.
  
---

## 📸 Screenshots

| Splash Screen                   | Builder Mode                   | Edit Mode                       | Share Modal                    | Preview Modal                  |
| ------------------------------- | ------------------------------ | ------------------------------- | ------------------------------ | ------------------------------ |
| ![startup](https://github.com/user-attachments/assets/e90a6dff-801c-45ec-92cf-299c4e72a95f) | ![builder](https://github.com/user-attachments/assets/07404798-20a0-4e3b-8b25-bf9d7248867e) | ![editor](https://github.com/user-attachments/assets/a883ae8b-75a5-4741-8eb0-cc613292680b) | ![share](https://github.com/user-attachments/assets/0daa76ed-d1ba-434a-a0fe-0a710c1cb97d) | ![preview](https://github.com/user-attachments/assets/9709e1dd-7b7a-4732-89b9-0019674b91c2) |

---

## 🧱 Tech Stack

* **Frontend**: [React](https://reactjs.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Drag & Drop**: [@dnd-kit](https://github.com/clauderic/dnd-kit)
* **Unique IDs**: [`uuid`](https://www.npmjs.com/package/uuid), [`nanoid`](https://www.npmjs.com/package/nanoid)
* **Deployment**: [Netlify](https://www.netlify.com/)

---

## 🛠️ Installation & Setup

```bash
git clone https://github.com/meghavx/quikform.git
cd quikform
npm install
npm run dev
```

Visit `http://localhost:5173` to start building!

---

## 🗃️ Folder Structure

```
src/
├── components/       # Reusable UI components like Header, ShareModal
├── pages/            # Main builder and preview views
├── store/            # Zustand store for form state
├── App.jsx
├── main.jsx
```

---

## ✅ Future Enhancements

* Persistent form storage with backend/database
* Allow users to reorder fields using drag actions  
* Implement multi-step form functionality
* Form export to PDF
* Form responses collection & analytics
* Predefined form templates
* Theme customization
---


## 📄 License

This project is licensed under the **GNU General Public License v3.0**.
See the [LICENSE](./LICENSE) file for more details.

---

## 🙌 Acknowledgments

Inspired by form builders like Google Forms, Typeform, and others.
