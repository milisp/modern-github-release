import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const RepoHeader: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-primary hover:opacity-70 transition-opacity px-3 py-2 rounded-lg hover:bg-accent"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Back</span>
      </button>
    </div>
  )
}
