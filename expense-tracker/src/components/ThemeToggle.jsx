// src/components/ThemeToggle.jsx
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeToggle;