// GitHub API utilities

interface GitHubAsset {
  name: string
  download_count: number
  browser_download_url: string
  size: number
}

interface GitHubRelease {
  id: number
  tag_name: string
  name: string
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string
  assets: GitHubAsset[]
}

interface GitHubRepoInfo {
  id: number
  name: string
  full_name: string
  owner: {
    login: string
    avatar_url: string
  }
  description: string | null
  homepage: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  language: string | null
}

const GITHUB_API_BASE = 'https://api.github.com'

export const fetchReleases = async (owner: string, repo: string): Promise<GitHubRelease[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/releases`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: GitHubRelease[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching releases:', error)
    throw error
  }
}

export const fetchRepoInfo = async (owner: string, repo: string): Promise<GitHubRepoInfo> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: GitHubRepoInfo = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching repo info:', error)
    throw error
  }
}

export type { GitHubRelease, GitHubRepoInfo, GitHubAsset }