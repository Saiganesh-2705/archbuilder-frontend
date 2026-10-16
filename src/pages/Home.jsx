import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import QualitySplit from "../components/QualitySplit";
import BigImageBanner from "../components/BigImageBanner";
import AboutTeaser from "../components/AboutTeaser";
import Features from "../components/Features";
import Services from "../components/Services";
import ProjectGallery from "../components/ProjectGallery";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import ExpandingGallery from "../components/ExpandingGallery";
import BuildJourney from "../components/BuildJourney";
import WordBand from "../components/WordBand";
import ImageMarquee from "../components/ImageMarquee";
import CostEstimator from "../components/CostEstimator";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import { useQuote } from "../context/QuoteContext";

const Home = () => {
  const { openQuote } = useQuote();
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <QualitySplit />

      <Features />

      <BigImageBanner />

      <AboutTeaser />

      <WordBand />

      <Services limit={4} />

      <ExpandingGallery />

      <ImageMarquee />

      <BuildJourney />

      <CostEstimator />

      <BeforeAfterSlider />

      <ProjectGallery />

      <Testimonials />

      <section className="bg-amber py-16 overflow-hidden">
        <Reveal className="container-px flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-display font-extrabold text-2xl md:text-4xl text-ink max-w-xl">
            Ready to start building?
          </h2>
          <button onClick={openQuote} className="btn-dark animate-soft-pulse">
            Get a free quote <span aria-hidden>&rarr;</span>
          </button>
        </Reveal>
      </section>

      <Footer />
    </>
  );
};

export default Home;
