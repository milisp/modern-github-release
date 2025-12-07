import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { fetchReleases, fetchRepoInfo } from '../utils/github'
import { getPlatformStats, getOS } from '../utils/platform'
import ErrorBack from './ErrorBack'
import { useQuery } from '@tanstack/react-query'
import { RepoHeader } from './repo/RepoHeader'
import { SearchBar } from './repo/SearchBar'
import { RepoInfo } from './repo/RepoInfo'
import { DownloadStats } from './repo/DownloadStats'
import { DownloadButton } from './repo/DownloadButton'
import { ReleasesSection } from './repo/ReleasesSection'
import { GithubStar } from '@/components/github-star'
import { Skeleton } from '@/components/ui/skeleton'
import type { GitHubRelease, GitHubRepoInfo } from '../utils/github'
import type { OS } from '../utils/platform'

interface QueryData {
  releasesData: GitHubRelease[]
  repoData: GitHubRepoInfo
}

const GitHubStats: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>()
  const [platformStats, setPlatformStats] = useState<Record<string, number>>({})
  const userOS = useMemo(() => getOS(navigator.userAgent), [])

  const {
    data,
    isLoading,
    isError,
    error: queryError,
  } = useQuery<QueryData>({
    queryKey: ['github', owner, repo],
    queryFn: async () => {
      if (!owner || !repo) {
        throw new Error('Owner and repo are required')
      }
      const [releasesData, repoData] = await Promise.all([
        fetchReleases(owner, repo),
        fetchRepoInfo(owner, repo),
      ])
      return { releasesData, repoData }
    },
    enabled: !!owner && !!repo,
  })

  useEffect(() => {
    if (data) {
      setPlatformStats(getPlatformStats(data.releasesData))
    }
  }, [data])

  const totalDownloads = Object.values(platformStats).reduce(
    (sum, count) => sum + count,
    0
  )

  if (isError) {
    return <ErrorBack message={queryError?.message || 'Failed to fetch data'} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-4">
        {/* Header with Search */}
        <div className="mb-8">
          <div className="flex mb-6 gap-1">
            <RepoHeader />
            <SearchBar />
            <GithubStar />
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {isLoading ? (
                <>
                  <div className="flex-1">
                    <div className="mb-4">
                      <Skeleton className="h-12 w-72 mb-4" />
                      <Skeleton className="h-6 w-96 mb-4" />
                      <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                    </div>
                  </div>
                  <div className="lg:min-w-[200px]">
                    <Skeleton className="h-24 w-48" />
                  </div>
                </>
              ) : (
                <>
                  <RepoInfo repoInfo={data?.repoData} />
                  <DownloadStats
                    totalDownloads={totalDownloads}
                    platformStats={platformStats}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <DownloadButton releases={data?.releasesData} userOS={userOS} />

        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-8 w-48 mb-4" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg shadow-md p-6 mb-6">
                <Skeleton className="h-6 w-72 mb-4" />
                <Skeleton className="h-4 w-48 mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ReleasesSection releases={data?.releasesData || []} />
        )}
      </div>
    </div>
  )
}

export default GitHubStats
