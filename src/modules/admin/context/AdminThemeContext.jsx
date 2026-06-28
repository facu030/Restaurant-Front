import { useEffect, useMemo, useRef, useState } from 'react';
import { ADMIN_THEMES, ADMIN_THEME_STORAGE_KEY, AdminThemeContext } from './adminTheme';

const getStoredTheme = () => {
  const stored = window.localStorage.getItem(ADMIN_THEME_STORAGE_KEY);

  return ADMIN_THEMES.includes(stored) ? stored : 'light';
};

export function AdminThemeProvider({ children }) {
  const previousDarkClass = useRef(document.documentElement.classList.contains('dark'));
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    window.localStorage.setItem(ADMIN_THEME_STORAGE_KEY, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const hadDarkClass = previousDarkClass.current;

    return () => {
      document.documentElement.classList.toggle('dark', hadDarkClass);
    };
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
    }),
    [theme],
  );

  return (
    <AdminThemeContext.Provider value={value}>
      {children}
    </AdminThemeContext.Provider>
  );
}
