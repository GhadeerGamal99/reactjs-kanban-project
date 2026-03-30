## ✨ Features
* **Interactive Kanban Board:** Smooth drag-and-drop using `react-dnd`.
* **Infinite Scrolling:** Dynamic data fetching with `TanStack Query`.
* **Real-time Search:** Filter tasks instantly across all columns.
* **Responsive UI:** Modern design using Tailwind CSS and MUI.

## 🚀 Tech Stack
- **Framework:** React 18 (TypeScript)
- **State Management:** Redux Toolkit & React Query
- **Styling:** Tailwind CSS & Material UI
- **Backend:** MockAPI.io (RESTful API)

## 💡 Challenges Faced
- **CORS & PATCH Issues:** Overcame MockAPI limitations by switching to `PUT` requests and ensuring full object updates.
- **Client-side Pagination:** Implemented manual slicing and filtering within `useInfiniteQuery` to provide a smooth scrolling experience despite API constraints.

## 📂 Project Structure

This project follows a **Modular Clean Architecture** to ensure separation of concerns, high maintainability, and scalability.

| Directory | Responsibility |
| :--- | :--- |
| 🧩 **components/** | Pure UI components (Atomic design: Buttons, Modals, Inputs). |
| 📄 **pages/** | Main application views and high-level route components. |
| ⚓ **hooks/** | Custom React Query hooks (Server State) and complex logic. |
| 🧠 **store/** | Redux Toolkit setup, global slices (Search, UI state). |
| ⚙️ **config/** | Axios instances, API base URLs, and environment settings. |
| 🛠️ **utils/** | Pure helper functions (Formatters, Date logic, calculations). |
| 📍 **consts/** | Application-wide constants (Endpoints, Column names, Enums). |
| 🛡️ **schemas/** | Data validation schemas (e.g., Zod/Yup) for forms and API safety. |
| 🏷️ **types/** | Global TypeScript interfaces and shared type definitions. |

---

### 🏗️ Why this structure?
- **Scalability:** New features can be added without bloating the existing codebase.
- **Testability:** Logic is separated from UI, making it easier to write unit tests.
- **Maintainability:** Finding and fixing bugs is faster when every file has a clear, single responsibility.

## ⚙️ Installation & Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the local development server.