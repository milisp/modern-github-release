import React, { useEffect, useMemo, useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { GithubStar } from '@/components/github-star'

interface ParsedInput {
  owner: string
  repo: string
}

const Home: React.FC = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [showAll, setShowAll] = useState(false)
  const navigate = useNavigate()

  const STORAGE_KEY = 'homeSearchHistory'

  // Load history on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: unknown = JSON.parse(raw)
        if (Array.isArray(parsed)) setHistory(parsed)
      }
    } catch {
      // Silently fail on parse error
    }
  }, [])

  const visibleHistory = useMemo(() => {
    if (showAll) return history
    return history.slice(0, 5)
  }, [history, showAll])

  const parseInput = (value: string): ParsedInput | null => {
    let owner: string | undefined
    let repo: string | undefined
    if (!value) return null
    if (value.includes('github.com')) {
      const match = value.match(/github\.com\/([^/]+)\/([^/]+)/)
      if (match) {
        owner = match[1]
        repo = match[2]
      }
    } else if (value.includes('/')) {
      const parts = value.split('/')
      if (parts.length === 2) {
        owner = parts[0]
        repo = parts[1]
      }
    }
    if (owner && repo) return { owner, repo }
    return null
  }

  const pushHistory = (owner: string, repo: string) => {
    const entry = `${owner}/${repo}`
    const next = [entry, ...history.filter((h) => h !== entry)]
    setHistory(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Silently fail on storage error
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const parsed = parseInput(input)
    if (parsed) {
      pushHistory(parsed.owner, parsed.repo)
      navigate(`/repo/${parsed.owner}/${parsed.repo}`)
    } else {
      alert('Please enter a valid GitHub URL or owner/repo format')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <GithubStar />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              GitHub Release Statistics
            </h1>
            <p className="text-muted-foreground text-lg">
              Analyze download statistics for any GitHub repository
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  id="repo-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., https://github.com/owner/repo or owner/repo"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 text-foreground placeholder-muted-foreground bg-background"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                Get Statistics
              </button>
            </form>

            {history.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Recent searches</span>
                  {history.length > 5 && (
                    <button
                      type="button"
                      onClick={() => setShowAll((v) => !v)}
                      className="text-xs text-primary hover:underline"
                    >
                      {showAll ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {visibleHistory.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => {
                        const [owner, repo] = h.split('/')
                        navigate(`/repo/${owner}/${repo}`)
                      }}
                      className="px-3 py-1 text-sm bg-accent text-foreground rounded hover:opacity-80 border border-border"
                      title={h}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
