import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface DownloadStatsProps {
  totalDownloads: number
  platformStats: Record<string, number>
}

export const DownloadStats: React.FC<DownloadStatsProps> = ({ totalDownloads, platformStats }) => {
  return (
    <>
      {/* Total Downloads */}
      <Card className="text-center">
        <CardContent>
          <div className="text-3xl font-bold">
            {totalDownloads.toLocaleString()}
          </div>
          <div className="text-sm font-medium">Total Downloads</div>
        </CardContent>
      </Card>

      {/* Platform Statistics */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(platformStats).map(([platform, count]) =>
          count > 0 ? (
            <Card key={platform}>
              <CardContent className="text-center">
                <div className="text-lg font-bold">
                  {count.toLocaleString()}
                </div>
                <div className="text-xs truncate" title={platform}>
                  {platform}
                </div>
              </CardContent>
            </Card>
          ) : null
        )}
      </div>
    </>
  )
}
