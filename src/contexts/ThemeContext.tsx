import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(getInitialTheme())
  const isUserManuallySet = useRef(!!localStorage.getItem('theme'))

  // Apply theme to DOM
  useEffect(() => {
    const html = document.documentElement
    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [theme])

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      // Only follow system changes if user hasn't manually set theme
      if (!isUserManuallySet.current) {
        const newTheme: Theme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    isUserManuallySet.current = true
  }

  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme)
    if (newTheme === 'light') {
      localStorage.removeItem('theme')
      isUserManuallySet.current = false
    } else {
      localStorage.setItem('theme', newTheme)
      isUserManuallySet.current = true
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeValue }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export type { Theme, ThemeContextType }
