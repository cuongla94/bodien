import React, { useContext, useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from 'theme/ThemeContext';
import { ToggleLabel } from './styles';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <ToggleLabel>
      <Toggle
        className="react-toggle"
        checked={theme.type === 'dark'}
        onChange={toggleTheme}
        icons={{
          checked: <FaMoon />,
          unchecked: <FaSun />,
        }}
      />
    </ToggleLabel>
  );
};
