import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectsAPI } from "../services/api";
import Reveal from "./Reveal";

const stages = ["Ongoing", "Completed", "For Sale", "Interior"];

const stageCopy = {
  Ongoing: "Active sites, right now — framing, finishing, and everything between.",
  Completed: "Handed over and lived in — a look at the finished craftsmanship.",
  "For Sale": "Move-in ready homes and plots currently open for enquiry.",
  Interior: "Interior fit-outs, joinery, and finishing work up close.",
};

/**
 * Flattens each project's cover + gallery photos into one photo grid so a
 * single stage tab reads like a real photo wall, not just a card list.
 */
const flattenPhotos = (projects, cap = 9) => {
  const photos = [];
  projects.forEach((p) => {
    [p.coverImage, ...(p.gallery || [])].forEach((src) => {
      if (src) photos.push({ src, title: p.title, id: p._id, location: p.location });
    });
  });
  return photos.slice(0, cap);
};

// Varies tile height across the masonry columns so the wall doesn't look
// like a plain uniform grid — an intentional break from the reference's
// fixed square layout.
const tileHeight = (i) => ["h-48", "h-64", "h-56", "h-72", "h-48", "h-60"][i % 6];

const ProjectGallery = () => {
  const [stage, setStage] = useState(stages[0]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    projectsAPI
      .getAll({ stage, limit: 6 })
      .then(({ data }) => {
        if (!ignore) setProjects(data.projects || []);
      })
      .catch(() => {
        if (!ignore) setProjects([]);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [stage]);

  const photos = flattenPhotos(projects);

  return (
    <section className="container-px py-24">
      <Reveal className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <span className="eyebrow">// Browse by stage</span>
          <h2 className="section-title mt-4">Ongoing, completed, for sale &amp; interiors.</h2>
        </div>
        <Link to="/projects" className="btn-secondary">
          View all projects <span aria-hidden>&rarr;</span>
        </Link>
      </Reveal>

      <Reveal delay={100} className="mt-8 flex flex-wrap gap-3">
        {stages.map((s) => (
          <button
            key={s}
            onClick={() => setStage(s)}
            className={`px-5 py-2.5 text-xs font-bold tracking-wide uppercase transition-colors duration-200 ${
              stage === s ? "bg-ink text-white" : "bg-white text-ink border border-line hover:border-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </Reveal>

      <p className="text-stone text-sm mt-4 max-w-md">{stageCopy[stage]}</p>

      {loading && (
        <div className="mt-8 columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`mb-4 bg-ink/5 animate-pulse ${tileHeight(i)}`} />
          ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <p className="text-stone text-sm mt-10">No photos for this stage yet — check back soon.</p>
      )}

      {!loading && photos.length > 0 && (
        <div className="mt-8 columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]" key={stage}>
          {photos.map((photo, i) => (
            <Link
              to={`/projects/${photo.id}`}
              key={`${photo.id}-${i}`}
              className={`group relative block mb-4 overflow-hidden animate-fade-up ${tileHeight(i)}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-semibold truncate">{photo.title}</p>
                <p className="text-white/60 text-[11px] truncate">{photo.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
