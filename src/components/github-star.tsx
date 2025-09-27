import { Github } from "lucide-react";

export function GithubStar() {
  return (
    <div className="flex justify-end">
      <a
        href="https://github.com/milisp/modern-github-release"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-gray-800"
        aria-label="Star milisp/modern-github-release on GitHub"
      >
        <Github className="h-4 w-4" />
      </a>
    </div>
  );
}
