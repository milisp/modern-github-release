import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RepoHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors px-3 py-2 rounded-lg hover:bg-white/50"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Back</span>
      </button>
    </div>
  );
}
