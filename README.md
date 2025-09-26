# Inosoft FE — Yard Inspection System

This project is a Frontend Yard Inspection System built with:
- Vue 3 (Composition API)
- Vuex
- Vue Router
- Bootstrap 5
- Vite
- Vitest for unit testing

--- 

## Main Features

- Inspection List — display inspections with sorting and filtering.
- Create Inspection — form to create new inspections with validation.
- Inspection Detail — summary, scope of work, items, and status view.
- Reusable Components — built using atomic design (atoms, molecules, organisms).
- Unit Testing with Vitest & Vue Test Utils.

---

## Project Structure (Simplified)

```bash
src/
│
├── assets/             # Static files
├── components/         # Reusable UI components
├── composables/        # Vue composables (useDropdowns, useInspectionForm)
├── store               # Vuex Store
├── router/             # Vue Router configuration
└── utils/              # utility helpers (formatters, etc.)
test/                   # unit test

```
---

## Setup

### Installation 

- Clone the repository:

```bash
git clone https://github.com/rizkyari/inosoft-fe
cd inosoft-fe
```

- Install dependencies:

```bash
npm install
```

- Start the development server:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
```

- Preview the production build:

```bash
npm run preview
```

### Running Tests

This project uses Vitest and Vue Test Utils.

Run all tests:

```bash
npm run test
```

Example tests are available in:

- tests/components/UiInput.test.js

- tests/components/UiSelect.test.js

- tests/components/Breadcrumb.test.js

- tests/composables/useDropdowns.test.js

---

## Notes

Dummy JSON data is served from public/:

- inspection.json

- inspection-detail.json

- dropdowns.json

- fe-datatest.json

Create Inspection currently stores data in Vuex state only (no backend).
New inspections redirect to the detail page after submission.

---

## License

MIT (or follow the instructions from the hiring test if a specific license is required).

---

## Author

Developed by Rizky Ari

[Linkedin](https://www.linkedin.com/in/rizkyarihar/) | [GitHub](https://github.com/rizkyari)