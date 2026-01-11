# Dynamic Filter Component System

A reusable, type-safe, dynamic filter builder and data table implemented with React, TypeScript and Vite.  
This project demonstrates a modular component system capable of building complex filters for varied field types and applying them to a local JSON dataset (mocked API). It was built as a frontend developer assessment to show architecture, type safety, filtering algorithms, and UX considerations.

Live demo: https://dynamic-filter-component-system-f0q22r4vr.vercel.app/

---

Table of contents
- [Highlights](#highlights)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Data & mock API](#data--mock-api)
- [Filter system overview](#filter-system-overview)
  - [Supported field types & operators](#supported-field-types--operators)
  - [Filter logic & behavior](#filter-logic--behavior)
  - [Type safety & extensibility](#type-safety--extensibility)
- [Components](#components)
- [Examples / Usage](#examples--usage)
- [Performance & testing](#performance--testing)
- [Validation, edge cases & UX](#validation-edge-cases--ux)
- [Deployment](#deployment)
- [Assumptions & future improvements](#assumptions--future-improvements)
- [License](#license)

---

## Highlights

- Dynamic Filter Builder: Add/remove multiple filters, select fields, choose operators, provide values with context-appropriate inputs.
- Multi-type support: Text, Number, Date, Amount/Currency, Single Select, Multi-Select, Boolean, Arrays and nested objects.
- Reusable, type-safe components using TypeScript.
- Client-side filtering with AND semantics between different fields and OR semantics for multiple conditions on the same field.
- Sample dataset with 50+ diverse records (nested objects, arrays, dates, booleans).
- Mocked local JSON API using `mock-json-api` for development.
- Table with sorting, record counts, "No results", and nested-object display.

---

## Features

- Dynamic UI that renders the correct input control for each field type (text input, number input, date-range picker, dropdowns, multi-select, toggle).
- Operator mapping that changes with selected field type.
- Validation for number/date ranges and required values.
- Real-time filter application with immediate table updates (debounced where appropriate).
- Case-insensitive text matching, numeric comparisons, date comparisons, array contains/in/not-in operations, nested dot-notation filtering (e.g., `address.city`).
- Export filtered results to CSV/JSON (optional/bonus — include or enable as needed).
- Filter persistence (localStorage) available as a toggle/option.

---

## Tech stack

- React 18 + TypeScript
- Vite (development & build)
- Material UI (component library and styling)
- Lucide React (icons)
- mock-json-api (local JSON mock server)
- date-fns (date parsing/comparison)
- lodash (utility helpers)
- react-window (optional — for table virtualization if enabling beyond 50 records)

---

## Project structure (high level)

- src/
  - components/
    - FilterBuilder/         # Main filter builder + controls
    - FilterCondition/       # Single filter row and input renderers
    - FieldInput/            # Type-specific input components (Text, Number, DateRange, Select, MultiSelect, Toggle)
    - DataTable/             # Table component (sorting, counts)
    - Common/                # Reusable UI atoms (Buttons, Icons, Modal wrappers)
  - hooks/
    - useFilters.ts          # Filter state and helpers
    - useData.ts             # Data fetching & memoized filtering
  - lib/
    - filterEngine.ts        # Filtering algorithms / operator implementations
    - types.ts               # TypeScript types & field definitions
    - sample-data.ts         # Generated sample dataset (50+ records)
    - mock-server.ts         # mock-json-api setup
  - pages/
    - App.tsx
  - index.tsx
- public/
- package.json
- vite.config.ts
- README.md

---

## Getting started

Prerequisites:
- Node 18+ / npm 8+ (or yarn 1/berry)
- Git

Install and run locally:

1. Clone the repo
   ```bash
   git clone https://github.com/MDIMRAN314/dynamic-filter-component-system.git
   cd dynamic-filter-component-system
   ```

2. Install
   ```bash
   npm ci
   # or
   yarn install
   ```

3. Start the local mock API and dev server (single command)
   ```bash
   npm run dev
   ```

Common scripts (see package.json):
- `npm run dev` — start vite dev server + mock-json-api
- `npm run build` — build production bundle
- `npm run preview` — preview production build
- `npm run lint` — run linter
- `npm run test` — run tests (if included)

---

## Data & mock API

- A sample dataset of 50+ employees with realistic variation is included at `src/lib/sample-data.ts` (or `src/data/employees.json`). Each record includes fields such as:
  - id, name, email, department, role
  - salary (number), joinDate (ISO string), isActive (boolean)
  - skills (array of strings), address (nested object: city/state/country)
  - projects (number), lastReview (ISO string), performanceRating (number)
- The project uses `mock-json-api` to expose these records on a local endpoint (e.g., `http://localhost:3000/employees`) for development parity with a real API.

---

## Filter system overview

### Supported field types & operators

- Text
  - Operators: Equals, Contains, Starts With, Ends With, Does Not Contain
  - Input: text input (case-insensitive matching)
- Number
  - Operators: Equals, Greater Than, Less Than, Greater Than or Equal, Less Than or Equal, Between
  - Input: number input(s) with validation
- Date
  - Operators: Before, After, Between
  - Input: date picker or date range picker (uses date-fns)
- Amount / Currency
  - Operators: Between, Equals, >, <, >=, <=
  - Input: number inputs with formatting (currency)
- Single Select
  - Operators: Is, Is Not
  - Input: dropdown select
- Multi Select (array fields)
  - Operators: In (contains any), Not In (does not contain any), Contains All (optional)
  - Input: multi-select checkbox list
- Boolean
  - Operators: Is
  - Input: toggle or checkbox
- Nested fields
  - Dot notation supported (e.g., `address.city`)

### Filter logic & behavior

- Combining conditions:
  - AND between filters on different fields
  - OR within multiple conditions on the same field (e.g., name contains "John" OR "Jane")
- Matching:
  - Text: case-insensitive
  - Numbers & Amounts: numeric comparison with proper NaN handling
  - Dates: parsed with date-fns, supports relative ranges (e.g., last 30 days)
  - Arrays: supports contains any/all and not in
- Edge cases:
  - null / undefined values handled gracefully
  - empty arrays, invalid dates, or missing fields do not crash filtering engine

### Type safety & extensibility

- All field definitions, operators and filter condition shapes are strongly typed in `src/lib/types.ts`.
- Adding a new field type requires:
  - a field type enum
  - operator definitions for that type
  - an input component implementing a defined props interface
  - hooking the operator evaluation in `filterEngine.ts`

---

## Components

- FilterBuilder
  - Parent component that keeps filter state and exposes apply/clear behavior.
  - Props: fieldDefinitions, onApply(filters), initialFilters?, persistKey?
- FilterCondition
  - Single row UI to select field, operator and input value.
  - Handles validation per field type.
- FieldInput
  - Renders the correct input based on a field's type. Examples:
    - TextInput
    - NumberInput
    - DateRangePicker
    - CurrencyRangeInput
    - Select / MultiSelect
    - Toggle (boolean)
- DataTable
  - Displays results, supports sorting, shows total & filtered count, and "No results" state
  - Handles nested object display (e.g., address.city) and array display (skills joined)

---

## Examples / Usage

Basic example of rendering FilterBuilder and DataTable in `App.tsx`:

```tsx
import React from 'react'
import { FilterBuilder } from './components/FilterBuilder'
import { DataTable } from './components/DataTable'
import { fieldDefinitions } from './lib/fieldDefinitions'
import { useData } from './hooks/useData'

export function App() {
  const { data, filteredData, applyFilters } = useData('/employees')

  return (
    <div>
      <FilterBuilder
        fields={fieldDefinitions}
        onApply={(filters) => applyFilters(filters)}
        persistKey="employee-filters"
      />
      <DataTable data={filteredData} total={data.length} />
    </div>
  )
}
```

Filter definition (example):

```ts
// src/lib/fieldDefinitions.ts
export const fieldDefinitions = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'text' },
  { id: 'department', label: 'Department', type: 'single-select', options: ['Engineering', 'Sales', 'Marketing'] },
  { id: 'salary', label: 'Salary', type: 'number', format: 'currency' },
  { id: 'joinDate', label: 'Join Date', type: 'date' },
  { id: 'skills', label: 'Skills', type: 'multi-select', options: ['React','TypeScript','Node.js'] },
  { id: 'address.city', label: 'City', type: 'text' },
  { id: 'isActive', label: 'Active', type: 'boolean' },
]
```

Filter condition shape (TypeScript):

```ts
type FilterCondition = {
  id: string // uuid
  field: string // field key, supports dot notation
  operator: string
  value: any
}
```

---

## Performance & testing

- Filtering algorithms are memoized using React hooks and `useMemo` so expensive computations run only on relevant input changes.
- For larger datasets the table can be virtualized with `react-window` (not mandatory for 50 records but prepared).
- Unit tests (if included) focus on `filterEngine.ts` to validate behavior for each operator and edge case.

---

## Validation, edge cases & UX

- Number inputs provide min/max validation and show inline errors.
- Date range ensures the start date is <= end date; error shown otherwise.
- Text input is debounced (200–300ms) to avoid excessive re-filtering during typing.
- Clear-all and remove-single controls are provided (with icons).
- Accessibility: inputs are labeled; ARIA attributes are added for better screen-reader support.

---

## Deployment

You can deploy the built site to Vercel / Netlify / Surge.

Build & preview:

```bash
npm run build
npm run preview
```

Add your repository to Vercel / Netlify and use the `build` command `npm run build` and `dist` as the publish directory.

---

## Assumptions & future improvements

Assumptions made during implementation:
- The dataset is reasonably small for client-side filtering (50–200 records). For much larger datasets, server-side filtering or pagination is recommended.
- Date fields are ISO strings and consistent across records.
- Currency/amount fields are stored as numbers (not formatted strings).

Future improvements:
- Add advanced operators (regex, fuzzy match).
- Server-side filtering adapter for large datasets.
- More comprehensive accessibility (keyboard navigation, screen-reader tests).
- Column-level custom renderers and filter presets/sharing.
- Server-synced filter persistence per user.

---

## Contributing

This repository is a demo/assessment. If you want to propose changes:
- Fork the repo
- Create a feature branch
- Submit a PR with small, focused changes and tests where applicable

---

## License

MIT — see LICENSE file.

---

If you want, I can:
- Add a demo deployment (Vercel) configuration and link
- Generate the sample dataset file and mock-server configuration for you
- Create a short video walkthrough or animated gif showcasing the filter builder in action

Last updated: 2026-01-11
