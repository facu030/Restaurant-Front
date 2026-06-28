import { useContext } from 'react';
import { AdminThemeContext } from '../context/adminTheme';

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}
