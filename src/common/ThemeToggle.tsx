import { useContext, useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'theme/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <label>
      <Toggle
        className="day-night-toggle"
        icons={{
          checked: <FontAwesomeIcon inverse icon="sun" />,
          unchecked: <FontAwesomeIcon inverse icon="moon" />,
        }}
        onChange={toggleTheme}
        checked={theme.type === 'dark'}
      />
    </label>
  );
};

export default ThemeToggle;
