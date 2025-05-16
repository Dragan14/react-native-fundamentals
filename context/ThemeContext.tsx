import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { blueLight, blueDark } from "../themes/blueTheme";

type ThemeType = typeof blueLight;
type ThemeMode = "light" | "dark" | "system";

/**
 * Defines the shape of the Theme context.
 */
interface ThemeContextType {
  /** The current theme object containing color definitions. */
  theme: ThemeType;
  /** Boolean indicating if the current theme is dark. */
  isDark: boolean;
  /** The currently selected theme mode ('light', 'dark', or 'system'). */
  themeMode: ThemeMode;
  /** Function to set the desired theme mode. */
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: blueLight,
  isDark: false,
  themeMode: "system",
  setThemeMode: () => {},
});

const THEME_MODE_KEY = "themeMode";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  // Load saved themeMode on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_MODE_KEY);
        if (stored === "light" || stored === "dark" || stored === "system") {
          setThemeMode(stored);
        }
      } catch (e) {
        console.error("Failed to load theme mode:", e);
      }
    })();
  }, []);

  // Save themeMode whenever it changes
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(THEME_MODE_KEY, themeMode);
      } catch (e) {
        console.error("Failed to save theme mode:", e);
      }
    })();
  }, [themeMode]);

  const isDark = useMemo(() => {
    if (themeMode === "system") {
      return systemColorScheme === "dark";
    }
    return themeMode === "dark";
  }, [themeMode, systemColorScheme]);

  const theme = useMemo(() => (isDark ? blueDark : blueLight), [isDark]);

  const contextValue = useMemo(
    () => ({
      theme,
      isDark,
      themeMode,
      setThemeMode,
    }),
    [theme, isDark, themeMode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
