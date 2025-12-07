import React from 'react'
import ReleaseTable from '../ReleaseTable'
import type { GitHubRelease } from '../../utils/github'

interface ReleasesSectionProps {
  releases: GitHubRelease[]
}

export const ReleasesSection: React.FC<ReleasesSectionProps> = ({ releases }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Releases ({releases.length})
      </h2>

      {releases.length === 0 ? (
        <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border p-8 text-center">
          <div className="text-muted-foreground mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-muted-foreground text-lg">
            No releases found for this repository.
          </p>
        </div>
      ) : (
        releases.map((release) => (
          <ReleaseTable key={release.id} release={release} />
        ))
      )}
    </div>
  )
}
