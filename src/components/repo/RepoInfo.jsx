import { Star, GitFork } from "lucide-react";

export function RepoInfo({ repoInfo }) {
  if (!repoInfo) return null;

  return (
    <div className="flex-1">
      {/* Repository Info with Avatar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        {/* Avatar and Full Repository Name */}
        <div className="flex items-center gap-3">
          {repoInfo?.owner?.avatar_url && (
            <img 
              src={repoInfo.owner.avatar_url} 
              alt={`${repoInfo.owner.login} avatar`}
              className="w-8 h-8 rounded-full border-2 border-gray-200 flex-shrink-0"
            />
          )}
          <h1 className="text-xl md:text-2xl font-bold flex items-center flex-wrap">
            <a 
              href={`https://github.com/${repoInfo?.owner?.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              {repoInfo?.owner?.login}
            </a>
            <span className="text-gray-400 mx-1">/</span>
            <a 
              href={`https://github.com/${repoInfo?.owner?.login}/${repoInfo?.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {repoInfo?.name}
            </a>
          </h1>
        </div>
      </div>

      {repoInfo?.description && (
        <p className="text-gray-600 mb-4">{repoInfo.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
        <div className="flex items-center gap-1">
          <Star />
          <span>{repoInfo?.stargazers_count?.toLocaleString() || 0}</span> stars
        </div>
        <div className="flex items-center gap-1">
          <GitFork />
          <span>{repoInfo?.forks_count?.toLocaleString() || 0}</span> Forks
        </div>
        {repoInfo?.language && (
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>{repoInfo.language}</span>
          </div>
        )}
      </div>
    </div>
  );
}
