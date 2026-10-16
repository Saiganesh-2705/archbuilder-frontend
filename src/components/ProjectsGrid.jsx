import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { projectsAPI } from "../services/api";

const stages = ["Ongoing", "Completed", "For Sale", "Interior"];
const stageIcon = {
  Ongoing: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  Completed: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  "For Sale": "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  Interior: "M4 4h16v16H4zM4 9h16M9 21V9",
};

const ProjectsGrid = ({ limit, showTabs = true }) => {
  const [projects, setProjects] = useState([]);
  const [params] = useSearchParams();
  const wanted = params.get("stage");
  const [stage, setStage] = useState(stages.includes(wanted) ? wanted : stages[0]);
  // Navbar menu links like /projects?stage=Completed switch the tab.
  useEffect(() => {
    if (stages.includes(wanted)) setStage(wanted);
  }, [wanted]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");
    projectsAPI
      .getAll({ stage: showTabs ? stage : undefined, limit: limit || 12 })
      .then(({ data }) => {
        if (!ignore) setProjects(data.projects);
      })
      .catch(() => {
        if (!ignore) setError("Couldn't load projects right now. Please try again shortly.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [stage, limit, showTabs]);

  return (
    <div>
      {showTabs && (
        <div className="flex flex-wrap gap-3 mb-10">
          {stages.map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${
                stage === s ? "bg-amber text-ink" : "bg-white text-ink border border-line hover:border-ink"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d={stageIcon[s]} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: limit || 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-ink/5 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && error && <p className="text-stone text-sm">{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p className="text-stone text-sm">No projects found for this filter yet.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Link
              to={`/projects/${p._id}`}
              key={p._id}
              className="group block bg-white border border-line hover:shadow-xl transition-shadow duration-300 animate-fade-up"
              style={{ animationDelay: `${(i % 6) * 80}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <span className="w-11 h-11 rounded-full bg-amber flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                    </svg>
                  </span>
                </span>
                <span className="absolute top-3 left-3 bg-amber text-ink text-xs font-bold px-3 py-1">
                  {p.stage}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-stone">{p.category} &middot; {p.location}</p>
                <p className="font-display text-lg mt-1 group-hover:text-amber-600 transition-colors">{p.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsGrid;
