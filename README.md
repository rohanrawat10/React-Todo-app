#iTaksh Todo App
A responsive React todo application for managing tasks with local storage persistence, edit/delete functionality, and incomplete/completed task separation. Built with React hooks (useState, useEffect, useRef), UUID for unique IDs, React Icons, and Tailwind CSS for styling.

#Features
.Add new tasks with validation for empty input
.Edit existing tasks by pre-filling the input field
.Mark tasks as complete/incomplete via checkboxes
.Delete tasks with confirmation dialog
.View separated lists for pending and completed tasks
.Auto-focus input on home page
.Responsive design for mobile and desktop (Tailwind classes like md:container, flex-col sm:flex-row)
.Data persists across sessions using localStorage​


#Tech Stack
.Frontend: React (hooks), JSX

#Styling: 
.Tailwind CSS
.Icons: react-icons (FaEdit, MdDelete, FaSave, GrUpdate)
.Utilities: uuid (v4 for task IDs)
.Storage: browser localStorage​

#Installation
Clone the repository.
.Install dependencies: npm install or bun install
.Run development server: npm start or bun dev
.Open http://localhost:3000 in browser​

#Usage
.Navigate via Navbar between "home" (add/edit) and "tasks" (view all)
.Enter task in input, click Save/Update button
.Checkboxes toggle completion status; edit/delete buttons on each task item
.Tasks auto-save to localStorage and reload on mount​

#Components
.App.jsx: Main component handling state, CRUD operations, page routing, and rendering
.Navbar: Imported from ./components/Navbar (navigation between home/tasks
