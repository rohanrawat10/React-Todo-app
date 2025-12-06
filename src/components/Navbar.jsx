function Navbar({ page, setPage }) {
  return (
    <nav className="navbar flex justify-between bg-slate-600 text-white py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-9">iTask</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li
          onClick={() => setPage("home")}
          className={`cursor-pointer transform duration-300 ${
            page === "home"
              ? "translate-y-[-3px] text-gray-200 drop-shadow-[0_0_6px_rgba(200,200,200,0.7)]" // subtle grey glow
              : "hover:translate-y-[-1px] hover:text-gray-300"
          }`}
        >
          Home
        </li>
        <li
          onClick={() => setPage("tasks")}
          className={`cursor-pointer transform duration-300 ${
            page === "tasks"
              ? "translate-y-[-3px] text-gray-200 drop-shadow-[0_0_6px_rgba(200,200,200,0.7)]" // subtle grey glow
              : "hover:translate-y-[-1px] hover:text-gray-300"
          }`}
        >
          Your Tasks
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
