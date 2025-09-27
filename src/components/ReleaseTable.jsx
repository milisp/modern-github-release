import { detectPlatform, platformEmojis } from "../utils/platform";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function ReleaseTable({ release }) {
  // Group assets by platform and calculate totals
  const platformGroups = {};
  const platformTotal = {};

  release.assets.forEach((asset) => {
    const platform = detectPlatform(asset.name);
    const os = platform.os; // os as key
    if (!platformGroups[os]) {
      platformGroups[os] = [];
      platformTotal[os] = 0;
    }
    platformGroups[os].push(asset);
    platformTotal[os] += asset.download_count;
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-1">
      <div className="mb-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {release.name || release.tag_name}(
          {Object.values(platformTotal)
            .reduce((a, b) => a + b, 0)
            .toLocaleString()}{" "}
          downloads)
        </h3>
        <p className="text-gray-600 text-sm">
          Released on {formatDate(release.published_at)}
        </p>
      </div>
      <Tabs defaultValue={Object.keys(platformGroups)[0]} className="w-full">
        <div className="mb-2 overflow-x-auto">
          <TabsList className="mb-1 w-auto inline-flex flex-nowrap min-w-full">
            {Object.entries(platformGroups).map(([platform, assets]) => (
              <TabsTrigger
                key={platform}
                value={platform}
                className="px-2 py-1 flex items-center gap-2"
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
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-0.5 px-2">Filename</th>
                    <th className="text-left py-0.5 px-2">Size</th>
                    <th className="text-left py-0.5 px-2">Downloads</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr
                      key={asset.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
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
  );
}

export default ReleaseTable;
