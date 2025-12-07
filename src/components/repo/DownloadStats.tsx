import React from 'react'

interface DownloadStatsProps {
  totalDownloads: number
  platformStats: Record<string, number>
}

export const DownloadStats: React.FC<DownloadStatsProps> = ({ totalDownloads, platformStats }) => {
  return (
    <>
      {/* Total Downloads */}
      <div className="text-center lg:text-right bg-blue-50 rounded-lg p-4 lg:min-w-[200px]">
        <div className="text-3xl font-bold text-blue-800">
          {totalDownloads.toLocaleString()}
        </div>
        <div className="text-sm text-blue-600 font-medium">Total Downloads</div>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {Object.entries(platformStats).map(([platform, count]) =>
          count > 0 ? (
            <div
              key={platform}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-lg font-bold text-gray-800">
                {count.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 truncate" title={platform}>
                {platform}
              </div>
            </div>
          ) : null
        )}
      </div>
    </>
  )
}
