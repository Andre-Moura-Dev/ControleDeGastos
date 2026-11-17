import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { palettes } from '../theme';

const STORAGE_KEY = '@finflow:theme:v1';
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
      } catch (error) {
        console.warn('Não foi possível carregar o tema salvo:', error);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, theme)
      .catch((error) => console.warn('Não foi possível salvar o tema:', error));
  }, [theme, loaded]);

  const value = useMemo(() => ({
    theme,
    colors: palettes[theme],
    toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'),
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme deve ser usado dentro de ThemeProvider.');
  return context;
}
