import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import GitHubStats from './components/GitHubStats'

const App: React.FC = () => {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repo/:owner/:repo" element={<GitHubStats />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App