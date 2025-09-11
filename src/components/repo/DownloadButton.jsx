import { Download } from "lucide-react";
import { detectPlatform, platformEmojis } from "../../utils/platform";

export function DownloadButton({ releases, userOS }) {
  if (!releases || releases.length === 0) return null;

  // Find assets that match the user's OS
  const matchingAssets = releases[0].assets.filter((asset) => {
    const platform = detectPlatform(asset.name);
    return platform.os === userOS;
  });

  if (matchingAssets.length === 0) return null;

  // Sort assets by architecture preference
  const sortedAssets = matchingAssets.sort((a, b) => {
    const platformA = detectPlatform(a.name);
    const platformB = detectPlatform(b.name);
    // Prefer ARM64 for macOS (Apple Silicon), x64 for others
    if (userOS === "macOS") {
      if (platformA.arch === "ARM64" && platformB.arch !== "ARM64") return -1;
      if (platformB.arch === "ARM64" && platformA.arch !== "ARM64") return 1;
    } else {
      if (platformA.arch === "x64" && platformB.arch !== "x64") return -1;
      if (platformB.arch === "x64" && platformA.arch !== "x64") return 1;
    }
    return 0;
  });

  const recommendedAsset = sortedAssets[0];
  const platform = detectPlatform(recommendedAsset.name);

  return (
    <div className="mb-6 flex flex-col gap-2">
      <a
        href={recommendedAsset.browser_download_url}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        download
      >
        {platformEmojis[platform.os]} Download for {platform.display}
        <Download className="w-4 h-4" />
      </a>
      {sortedAssets.length > 1 && (
        <div className="text-sm text-gray-500">
          Other versions available:
          {sortedAssets.slice(1).map((asset, index) => {
            const p = detectPlatform(asset.name);
            return (
              <a
                key={index}
                href={asset.browser_download_url}
                className="ml-2 text-blue-500 hover:underline"
                download
              >
                {p.arch}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
