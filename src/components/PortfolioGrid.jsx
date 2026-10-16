import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectsAPI } from "../services/api";

const categories = ["All", "Residential", "Commercial", "Landscape", "Renovation", "Interior"];

const PortfolioGrid = ({ limit, showFilters = true }) => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");
    projectsAPI
      .getAll({ category, limit: limit || 12 })
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
  }, [category, limit]);

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                category === c
                  ? "bg-ink text-sand border-ink"
                  : "border-ink/20 text-ink hover:border-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: limit || 6 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl bg-ink/5 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-stone text-sm">{error}</p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-stone text-sm">No projects found in this category yet.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link
              to={`/portfolio/${p._id}`}
              key={p._id}
              className="group relative rounded-2xl overflow-hidden h-72 block"
            >
              <img
                src={p.coverImage}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 p-5 text-sand">
                <p className="text-xs text-sand/70">{p.category}</p>
                <p className="font-display text-lg mt-1">{p.title}</p>
                <p className="text-sand/70 text-xs mt-1">{p.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioGrid;
