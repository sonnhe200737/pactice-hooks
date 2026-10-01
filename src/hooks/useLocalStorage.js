import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const savedValue = localStorage.getItem(key);

            if (savedValue !== null) {
                return JSON.parse(savedValue);
            }

            return initialValue;
        } catch (error) {
            console.error("Lỗi đọc LocalStorage:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Lỗi lưu LocalStorage:", error);
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;