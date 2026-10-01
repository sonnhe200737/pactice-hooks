import { useMemo, useState } from "react";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import useLocalStorage from "./hooks/useLocalStorage";
import { useTheme } from "./context/ThemeContext";

import "./App.css";

function App() {
    // =========================
    // THEME
    // =========================

    const { darkMode } = useTheme();

    // =========================
    // TASK DATA
    // =========================

    const [tasks, setTasks] = useLocalStorage(
        "mini-task-manager-tasks",
        []
    );

    // =========================
    // FILTER + SEARCH
    // =========================

    const [filter, setFilter] = useState("all");

    const [search, setSearch] = useState("");

    // =========================
    // ADD TASK
    // =========================

    const addTask = (name) => {
        if (!name.trim()) {
            return;
        }

        const newTask = {
            id: Date.now(),
            name: name.trim(),
            completed: false
        };

        setTasks((prevTasks) => [
            ...prevTasks,
            newTask
        ]);
    };

    // =========================
    // TOGGLE TASK
    // =========================

    const toggleTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        completed: !task.completed
                    }
                    : task
            )
        );
    };

    // =========================
    // DELETE TASK
    // =========================

    const deleteTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.filter(
                (task) => task.id !== id
            )
        );
    };

    // =========================
    // STATISTICS
    // =========================

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const incompleteTasks =
        totalTasks - completedTasks;

    // =========================
    // SEARCH + FILTER
    // =========================

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {

            const matchSearch = task.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchFilter =
                filter === "all"
                    ? true
                    : filter === "completed"
                        ? task.completed
                        : !task.completed;

            return matchSearch && matchFilter;
        });
    }, [tasks, search, filter]);

    // =========================
    // RENDER
    // =========================

    return (
        <div className={darkMode ? "App dark" : "App"}>

            <div className="task-container">

                {/* =========================
                    HEADER
                    ========================= */}

                <div className="header">
                    <Header />
                </div>

                {/* =========================
                    ADD TASK
                    ========================= */}

                <div className="task-form">
                    <TaskForm
                        onAddTask={addTask}
                    />
                </div>

                {/* =========================
                    SEARCH + FILTER
                    ========================= */}

                <div className="filter-search">

                    <select
                        className="filter-select"
                        value={filter}
                        onChange={(e) =>
                            setFilter(e.target.value)
                        }
                    >
                        <option value="all">
                            Tất cả
                        </option>

                        <option value="incomplete">
                            Chưa làm
                        </option>

                        <option value="completed">
                            Hoàn thành
                        </option>
                    </select>

                    <input
                        className="search-input"
                        type="text"
                        placeholder="Tìm kiếm..........."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                {/* =========================
                    STATISTICS
                    ========================= */}

                <div className="statistics">

                    <span>
                        Tổng: {totalTasks}
                    </span>

                    {" | "}

                    <span>
                        Chưa làm: {incompleteTasks}
                    </span>

                    {" | "}

                    <span>
                        Hoàn thành: {completedTasks}
                    </span>

                </div>

                {/* =========================
                    TASK LIST
                    ========================= */}

                <div className="task-list">

                    <TaskList
                        tasks={filteredTasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />

                </div>

            </div>

        </div>
    );
}

export default App;