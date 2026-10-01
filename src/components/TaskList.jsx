import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onDelete }) => {

    // Không có task
    if (tasks.length === 0) {
        return (
            <p className="empty-message">
                Không có công việc nào.
            </p>
        );
    }

    return (
        <div className="task-list">

            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
};

export default TaskList;