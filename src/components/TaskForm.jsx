import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = taskName.trim();

        // Không cho thêm task rỗng
        if (!name) {
            return;
        }

        // Gửi task lên App.js
        onAddTask(name);

        // Xóa nội dung input sau khi thêm
        setTaskName("");
    };

    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={taskName}
                placeholder="Nhập tên công việc........"
                onChange={(e) =>
                    setTaskName(e.target.value)
                }
            />

            <button type="submit">
                Thêm
            </button>
        </form>
    );
};

export default TaskForm;