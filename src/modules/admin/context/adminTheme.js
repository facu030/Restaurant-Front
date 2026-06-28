import { createContext } from 'react';

export const ADMIN_THEME_STORAGE_KEY = 'admin-theme';
export const ADMIN_THEMES = ['light', 'dark'];

export const AdminThemeContext = createContext({
  theme: 'light',
  isDark: false,
  setTheme: () => {},
});
