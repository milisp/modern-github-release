import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Copy, CopyCheck } from 'lucide-react'

interface DownloadStatsProps {
  totalDownloads: number
  platformStats: Record<string, number>
}

export const DownloadStats: React.FC<DownloadStatsProps> = ({ totalDownloads, platformStats }) => {
  const [isCopy, setIsCopy] = useState(false)
  return (
    <>
      {/* Total Downloads */}
      <Card className="relative text-center">
        <CardContent>
          <div className="text-3xl font-bold">
            {totalDownloads.toLocaleString()}
          </div>
          <div className="text-sm font-medium">Total Downloads</div>
        </CardContent>
        <button
          className="absolute top-2 right-2 p-1 rounded hover:bg-accent"
          onClick={() => {
            const text =
              `total:${totalDownloads}\n` +
              Object.entries(platformStats)
                .filter(([p]) => p.toLowerCase() !== "other")
                .map(([p, c]) => `${p}:${c}`)
                .join("\n");
            navigator.clipboard.writeText(text);
            setIsCopy(true);
            setTimeout(() => {
              setIsCopy(false);
            }, 2000);
          }}
        >
          {isCopy ? <CopyCheck /> : <Copy />}
        </button>
      </Card>

      {/* Platform Statistics */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(platformStats).map(([platform, count]) =>
          count > 0 && platform.toLowerCase() !== "other" ? (
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
