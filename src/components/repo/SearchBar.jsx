import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [history, setHistory] = useState([]);
  const [focused, setFocused] = useState(false);
  const STORAGE_KEY = 'repoSearchHistory';

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setHistory(parsed.slice(0, 5));
      }
    } catch {}
  }, []);

  const parseInput = (value) => {
    let searchOwner, searchRepo;
    if (!value) return null;
    if (value.includes('github.com')) {
      const match = value.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match) {
        searchOwner = match[1];
        searchRepo = match[2];
      }
    } else if (value.includes('/')) {
      const parts = value.split('/');
      if (parts.length === 2) {
        searchOwner = parts[0];
        searchRepo = parts[1];
      }
    }
    if (searchOwner && searchRepo) return { searchOwner, searchRepo };
    return null;
  };

  const pushHistory = (owner, repo) => {
    const entry = `${owner}/${repo}`;
    const next = [entry, ...history.filter((h) => h !== entry)].slice(0, 5);
    setHistory(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchInput.trim()) return

    const parsed = parseInput(searchInput)

    if (parsed) {
      pushHistory(parsed.searchOwner, parsed.searchRepo)
      navigate(`/repo/${parsed.searchOwner}/${parsed.searchRepo}`)
    } else {
      alert('Please enter a valid GitHub URL or owner/repo format')
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 100)}
          placeholder="Search another repo..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white/80 backdrop-blur-sm"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go
        </button>

        {focused && history.length > 0 && (
          <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {history.map((h) => (
              <button
                key={h}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  const [owner, repo] = h.split('/')
                  pushHistory(owner, repo)
                  navigate(`/repo/${owner}/${repo}`)
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                title={h}
              >
                {h}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
