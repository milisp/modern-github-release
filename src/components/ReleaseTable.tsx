import React from 'react'
import { detectPlatform, platformEmojis } from '../utils/platform'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowRight } from 'lucide-react'
import type { GitHubRelease } from '../utils/github'

interface ReleaseTableProps {
  release: GitHubRelease
}

const ReleaseTable: React.FC<ReleaseTableProps> = ({ release }) => {
  // Group assets by platform and calculate totals
  const platformGroups: Record<string, typeof release.assets> = {}
  const platformTotal: Record<string, number> = {}

  release.assets.forEach((asset) => {
    const platform = detectPlatform(asset.name)
    const os = platform.os // os as key
    if (!platformGroups[os]) {
      platformGroups[os] = []
      platformTotal[os] = 0
    }
    platformGroups[os].push(asset)
    platformTotal[os] += asset.download_count
  })

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-4 mb-1">
      <div className="mb-1">
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {release.name || release.tag_name}(
          {Object.values(platformTotal)
            .reduce((a, b) => a + b, 0)
            .toLocaleString()}{" "}
          downloads)
        </h3>
        <p className="text-muted-foreground text-sm">
          Released on {formatDate(release.published_at)}
        </p>
        {release.body && (
          <Accordion type="single" collapsible>
            <AccordionItem value="release-note">
              <AccordionTrigger className="p-2">
                Release note
              </AccordionTrigger>
              <AccordionContent>
                <pre className="overflow-x-auto">
                  {release.body}
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
      <Tabs defaultValue={Object.keys(platformGroups)[0]} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="w-auto inline-flex flex-nowrap min-w-full">
            {Object.entries(platformGroups).map(([platform, assets]) => (
              <TabsTrigger
                key={platform}
                value={platform}
                className="p-1 flex items-center"
              >
                {platformEmojis[platform]} {platform} (
                {platformTotal[platform].toLocaleString()})
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {Object.entries(platformGroups).map(([platform, assets]) => (
          <TabsContent key={platform} value={platform}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-0.5 px-2">Filename</th>
                    <th className="text-left py-0.5 px-2">Size</th>
                    <th className="text-left py-0.5 px-2">Downloads</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr
                      key={asset.id}
                      className="border-b hover:bg-accent"
                    >
                      <td className="py-0.5 px-2">
                        <a
                          href={asset.browser_download_url}
                          className="text-blue-500 hover:underline"
                          download
                        >
                          {asset.name}
                        </a>
                      </td>
                      <td className="py-0.5 px-2">
                        {formatFileSize(asset.size)}
                      </td>
                      <td className="py-0.5 px-2">
                        {asset.download_count.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default ReleaseTable
