import Navbar from "../components/Navbar";
import ProjectsGrid from "../components/ProjectsGrid";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import WordBand from "../components/WordBand";
import ImageMarquee from "../components/ImageMarquee";

const ProjectsPage = () => (
  <>
    <Navbar />

    <PageHero
      eyebrow="// Our projects"
      title="Projects"
      crumb="Projects"
      images={[
        "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      ]}
      labels={["Live sites", "Modern homes", "Villas", "Elevations"]}
      subtitle="Browse active sites, finished homes and move-in-ready villas, each with its own gallery and specs."
      stat={{ end: 100, suffix: "%", label: "Safety record", body: "The highest safety standards on every active site." }}
      secondary={{ to: "/services", label: "Our services" }}
    />

    <section className="container-px py-20">
      <Reveal>
        <span className="eyebrow">// Explore our work</span>
        <SplitText as="h1" text="Showcasing exceptional projects with quality." className="section-title mt-4" />
        <p className="text-stone mt-4 max-w-lg">
          Browse by stage — from active sites to move-in-ready villas — or open
          a project for the full story, gallery, and specs.
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-12">
        <ProjectsGrid />
      </Reveal>
    </section>
    <WordBand words={["ONGOING", "COMPLETED", "FOR SALE", "INTERIORS"]} dark />
    <ImageMarquee />
    <Footer />
  </>
);

export default ProjectsPage;
