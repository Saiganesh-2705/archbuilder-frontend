import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projectsAPI } from "../services/api";

const ProjectsCarousel = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const updatePerView = () => {
      if (window.innerWidth < 768) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else setPerView(3);
    };
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  useEffect(() => {
    projectsAPI
      .getAll({ limit: 9 })
      .then(({ data }) => setProjects(data.projects))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const maxIndex = Math.max(projects.length - perView, 0);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const trackStyle = useMemo(
    () => ({
      transform: `translateX(-${index * (100 / perView)}%)`,
    }),
    [index, perView]
  );

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-72 bg-ink/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return <p className="text-stone text-sm">No projects to show yet — add some from the admin dashboard.</p>;
  }

  return (
    <div>
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          aria-label="Previous projects"
          className="w-11 h-11 border border-ink/20 rounded-full flex items-center justify-center hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink transition-colors"
        >
          &#8592;
        </button>
        <button
          onClick={() => setIndex((i) => Math.min(i + 1, maxIndex))}
          disabled={index >= maxIndex}
          aria-label="Next projects"
          className="w-11 h-11 border border-ink/20 rounded-full flex items-center justify-center hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink transition-colors"
        >
          &#8594;
        </button>
      </div>

      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-out" style={trackStyle}>
          {projects.map((p) => (
            <Link
              to={`/projects/${p._id}`}
              key={p._id}
              className="group flex-shrink-0 px-3"
              style={{ width: `${100 / perView}%` }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <span className="absolute top-4 left-4 bg-amber text-ink text-xs font-bold px-3 py-1">
                  {p.stage}
                </span>
                <div className="absolute bottom-0 p-5">
                  <p className="text-white/60 text-xs">{p.category}</p>
                  <p className="font-display text-white text-lg mt-1">{p.title}</p>
                  <p className="text-white/60 text-xs mt-1">{p.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
