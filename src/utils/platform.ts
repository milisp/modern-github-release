// Platform detection utilities
import type { GitHubRelease } from './github'

type OS = 'macOS' | 'Windows' | 'Linux' | 'Android' | 'iOS' | 'Other'

interface PlatformInfo {
  os: OS
  arch: string
  display: string
}

export const detectPlatform = (assetName: string): PlatformInfo => {
  const name = assetName.toLowerCase()
  let os: OS = 'Other'
  let arch = ''

  // Treat signature files as Other regardless of name contents
  // e.g., *.tar.gz.sig, *.rpm.sig
  if (name.endsWith('sig')) {
    return { os: 'Other', arch: '', display: 'Other' }
  }

  // Detect OS
  if (
    name.includes('mac') ||
    name.includes('darwin') ||
    name.includes('osx') ||
    name.includes('.dmg')
  ) {
    os = 'macOS'
  } else if (
    name.includes('win') ||
    name.includes('windows') ||
    name.includes('.exe') ||
    name.includes('.msi')
  ) {
    os = 'Windows'
  } else if (
    name.includes('linux') ||
    name.includes('ubuntu') ||
    name.includes('debian') ||
    name.includes('.deb') ||
    name.includes('.rpm') ||
    name.includes('.appimage')
  ) {
    os = 'Linux'
  } else if (name.includes('android') || name.includes('.apk')) {
    os = 'Android'
  } else if (
    name.includes('ios') ||
    name.includes('iphone') ||
    name.includes('ipad') ||
    name.includes('.ipa')
  ) {
    os = 'iOS'
  }

  // Detect architecture
  if (
    name.includes('aarch64') ||
    name.includes('arm64') ||
    name.includes('aarch')
  ) {
    arch = 'ARM64'
  } else if (
    name.includes('x64') ||
    name.includes('x86_64') ||
    name.includes('amd64')
  ) {
    arch = 'x64'
  } else if (name.includes('x86') || name.includes('i386') || name.includes('i686')) {
    arch = 'x86'
  } else if (name.includes('arm') || name.includes('armv7')) {
    arch = 'ARM'
  }

  // Return combined platform info
  return {
    os,
    arch,
    display: arch ? `${os} (${arch})` : os
  }
}

// Function to detect the user's operating system from the User-Agent string
export const getOS = (userAgent: string): OS => {
  const ua = userAgent.toLowerCase()

  // Detect iOS before macOS due to "like Mac OS X" in iOS UA
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod') || ua.includes('ios')) {
    return 'iOS'
  }
  if (ua.includes('mac os')) {
    return 'macOS'
  }
  if (ua.includes('windows')) {
    return 'Windows'
  }
  if (ua.includes('android')) {
    return 'Android'
  }
  if (ua.includes('linux')) {
    return 'Linux'
  }

  return 'Other'
}

export const getPlatformStats = (releases: GitHubRelease[]): Record<string, number> => {
  const stats: Record<string, number> = {}

  releases.forEach((release) => {
    release.assets.forEach((asset) => {
      const platform = detectPlatform(asset.name)
      const key = platform.os // only os name
      if (!stats[key]) {
        stats[key] = 0
      }
      stats[key] += asset.download_count
    })
  })

  return stats
}

export const platformEmojis: Record<OS, string> = {
  macOS: '🍎',
  Windows: '🪟',
  Linux: '🐧',
  Android: '🤖',
  iOS: '📱',
  Other: '📦'
}

export type { OS, PlatformInfo }
