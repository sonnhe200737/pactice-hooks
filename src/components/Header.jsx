import { useTheme } from "../context/ThemeContext";

function Header() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className="header-content">
            <h1>Mini Task Manager</h1>

            <button
                className="theme-button"
                onClick={toggleTheme}
            >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
        </div>
    );
}

export default Header;