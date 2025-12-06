import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState("home"); // "home" or "tasks"
  const inputRef = useRef(null);

  useEffect(() => {
    const tasksString = localStorage.getItem("tasks");
    if (tasksString) setTasks(JSON.parse(tasksString));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (page === "home" && inputRef.current) inputRef.current.focus();
  }, [page, editId]);

  const handleEdit = (id) => {
    const t = tasks.find((i) => i.id === id);
    setTask(t.task);
    setEditId(id);
    setPage("home");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((i) => i.id !== id));
    }
  };

  const handleAdd = () => {
    if (!task.trim()) return alert("Input field cannot be blank");

    if (editId) {
      setTasks(tasks.map((i) => (i.id === editId ? { ...i, task } : i)));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: uuidv4(), task, isCompleted: false }]);
    }
    setTask("");
  };

  const handleCheckBox = (id) => {
    setTasks(
      tasks.map((i) =>
        i.id === id ? { ...i, isCompleted: !i.isCompleted } : i
      )
    );
  };

  return (
    <>
      <Navbar page={page} setPage={setPage} />

      <div className="mx-3 md:container bg-violet-100 md:mx-auto my-5 rounded-xl p-4 md:p-5 min-h-[70vh] md:w-2/3 lg:w-1/2">
        <h1 className="font-bold text-center text-xl text-black">iTaks</h1>

        {page === "home" && (
          <div className="addtodo my-5 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-3 text-center">
              {editId ? "Edit Todo" : "Add a Todo"}
            </h2>
            <div className="flex w-full max-w-96 flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="text"
                ref={inputRef}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="flex-1 border-2 border-gray-400 rounded-lg px-3 py-2 
                           focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-300
                           text-base"
                placeholder="Enter your task..."
              />
              <button
                onClick={handleAdd}
                className="rounded-lg bg-violet-700 px-4 py-2 text-white hover:bg-violet-600 
                         flex items-center justify-center gap-2 sm:ml-2 text-base"
              >
                {editId ? (
                  <>
                    <GrUpdate className="text-sm" />
                    <span className="hidden xs:inline">Update</span>
                  </>
                ) : (
                  <>
                    <FaSave className="text-sm" />
                    <span className="hidden xs:inline">Save</span>
                  </>
                )}
              </button>
            </div>

            {/* Incomplete tasks */}
            <div className="todos mt-4 flex flex-col items-center w-full">
              {tasks.filter((i) => !i.isCompleted).length === 0 && (
                <div className="m-2 text-gray-600 text-center">No pending tasks!</div>
              )}
              {tasks
                .filter((i) => !i.isCompleted)
                .map((item) => (
                  <div
                    key={item.id}
                    className="todo flex w-full max-w-96 my-2 justify-between items-start bg-white p-3 rounded-lg shadow"
                  >
                    {/* Left side: checkbox + wrapping text */}
                    <div className="flex gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        name={item.id}
                        checked={item.isCompleted}
                        onChange={() => handleCheckBox(item.id)}
                        className="mt-1 flex-shrink-0"
                      />
                      <div className="flex-1 break-words overflow-hidden text-sm md:text-base">
                        {item.task}
                      </div>
                    </div>

                    {/* Right side: buttons */}
                    <div className="buttons flex shrink-0 self-start ml-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="rounded-lg bg-violet-700 p-2 mx-1 hover:bg-violet-600 hover:text-white text-white"
                        aria-label="Edit task"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg bg-violet-700 p-2 mx-1 hover:bg-violet-600 hover:text-white text-white"
                        aria-label="Delete task"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {page === "tasks" && (
          <>
            <h2 className="text-lg font-bold mt-2 text-center">
              Completed Todos
            </h2>
            <div className="todos mt-2 flex flex-col items-center w-full">
              {tasks.filter((i) => i.isCompleted).length === 0 && (
                <div className="m-2 text-gray-600 text-center">No completed tasks!</div>
              )}
              {tasks
                .filter((i) => i.isCompleted)
                .map((item) => (
                  <div
                    key={item.id}
                    className="todo flex w-full max-w-96 my-2 justify-between items-start bg-white p-3 rounded-lg shadow"
                  >
                    {/* Left side: checkbox + wrapping text */}
                    <div className="flex gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        name={item.id}
                        checked={item.isCompleted}
                        onChange={() => handleCheckBox(item.id)}
                        className="mt-1 flex-shrink-0"
                      />
                      <div className="flex-1 break-words overflow-hidden text-sm md:text-base line-through text-gray-600">
                        {item.task}
                      </div>
                    </div>

                    {/* Right side: buttons */}
                    <div className="buttons flex shrink-0 self-start ml-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="rounded-lg bg-violet-700 p-2 mx-1 hover:bg-violet-600 hover:text-white text-white"
                        aria-label="Edit task"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg bg-violet-700 p-2 mx-1 hover:bg-violet-600 hover:text-white text-white"
                        aria-label="Delete task"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;