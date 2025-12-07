import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border border-input bg-background p-2 hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  )
}
