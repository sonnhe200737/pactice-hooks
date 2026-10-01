const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <div className="task-item">

            <label className="task-content">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />

                <span
                    className={
                        task.completed
                            ? "completed"
                            : ""
                    }
                >
                    {task.name}
                </span>
            </label>

            <button
                className="delete-button"
                onClick={() => onDelete(task.id)}
            >
                Xóa
            </button>

        </div>
    );
};

export default TaskItem;