// GitHub API utilities
const GITHUB_API_BASE = 'https://api.github.com'

export const fetchReleases = async (owner, repo) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/releases`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching releases:', error)
    throw error
  }
}

export const fetchRepoInfo = async (owner, repo) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching repo info:', error)
    throw error
  }
}