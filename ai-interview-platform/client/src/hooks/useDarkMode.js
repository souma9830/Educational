import { useTheme } from './useTheme';

export function useDarkMode() {
  const { theme, toggleTheme } = useTheme();
  return [theme, toggleTheme];
}

export default useDarkMode;
