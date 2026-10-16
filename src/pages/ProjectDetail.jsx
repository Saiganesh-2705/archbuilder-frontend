import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { projectsAPI } from "../services/api";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState("loading");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setStatus("loading");
    setActiveImage(0);
    window.scrollTo({ top: 0 });
    projectsAPI
      .getOne(id)
      .then(({ data }) => {
        setProject(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  const gallery = project ? [project.coverImage, ...(project.gallery || [])].filter(Boolean) : [];

  return (
    <>
      <Navbar />
      <section className="container-px py-20">
        {status === "loading" && (
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-ink/10" />
            <div className="h-10 w-2/3 bg-ink/10 mt-4" />
            <div className="h-96 bg-ink/5 mt-10" />
          </div>
        )}

        {status === "error" && (
          <div className="py-20 text-center animate-fade-up">
            <p className="text-stone">We couldn't find that project.</p>
            <Link to="/projects" className="text-amber font-semibold text-sm mt-3 inline-block">
              &larr; Back to projects
            </Link>
          </div>
        )}

        {status === "ready" && project && (
          <>
            <Reveal>
              <Link to="/projects" className="text-amber font-semibold text-sm">
                &larr; Back to projects
              </Link>
            </Reveal>

            <Reveal delay={80} className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber text-ink text-xs font-bold px-3 py-1">{project.stage}</span>
                  <span className="text-stone text-xs font-semibold uppercase tracking-wide">{project.category}</span>
                </div>
                <h1 className="section-title mt-3">{project.title}</h1>
                <p className="text-stone mt-2">{project.location}</p>
              </div>
              <div className="flex gap-8 text-sm text-stone border-t border-ink/10 pt-4 flex-wrap">
                {project.year && (
                  <div>
                    <p className="text-ink font-display text-lg">{project.year}</p>
                    <p>Year</p>
                  </div>
                )}
                {project.area && (
                  <div>
                    <p className="text-ink font-display text-lg">{project.area}</p>
                    <p>Area</p>
                  </div>
                )}
                {project.client && (
                  <div>
                    <p className="text-ink font-display text-lg">{project.client}</p>
                    <p>Client</p>
                  </div>
                )}
                <div>
                  <p className="text-ink font-display text-lg">{project.stage}</p>
                  <p>Status</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150} className="mt-10">
              <div className="relative h-[280px] sm:h-[420px] md:h-[480px] overflow-hidden">
                <img
                  key={activeImage}
                  src={gallery[activeImage]}
                  alt={project.title}
                  className="w-full h-full object-cover animate-fade-up"
                />
              </div>

              {gallery.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {gallery.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-24 h-16 sm:w-28 sm:h-20 overflow-hidden transition-all duration-200 ${
                        i === activeImage ? "ring-2 ring-amber ring-offset-2" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={src} alt={`${project.title} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </Reveal>

            <div className="grid lg:grid-cols-[1fr_320px] gap-14 mt-14">
              <Reveal delay={100}>
                <span className="eyebrow">// Project overview</span>
                <p className="mt-5 text-stone leading-relaxed max-w-2xl">{project.description}</p>
              </Reveal>

              <Reveal delay={200} className="bg-sand border border-line p-6 h-fit">
                <h3 className="font-display text-lg">Interested in something similar?</h3>
                <p className="text-stone text-sm mt-2 leading-relaxed">
                  Tell us about your site and goals — we'll put together a scope and budget range.
                </p>
                <Link to="/contact" className="btn-dark mt-5 w-full justify-center">
                  Get a quote <span aria-hidden>&rarr;</span>
                </Link>
              </Reveal>
            </div>

            {gallery.length > 1 && (
              <Reveal delay={100} className="mt-16">
                <span className="eyebrow">// Full gallery</span>
                <h2 className="section-title mt-4">More from this project.</h2>
                <div className="mt-8 columns-2 sm:columns-3 gap-4 [column-fill:_balance]">
                  {gallery.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className="group relative block w-full mb-4 overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`${project.title} detail ${i + 1}`}
                        className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300" />
                    </button>
                  ))}
                </div>
              </Reveal>
            )}
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default ProjectDetail;
