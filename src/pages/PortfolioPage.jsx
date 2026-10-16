import Navbar from "../components/Navbar";
import PortfolioGrid from "../components/PortfolioGrid";
import Footer from "../components/Footer";

const PortfolioPage = () => (
  <>
    <Navbar />
    <section className="container-px py-20">
      <p className="text-clay text-sm font-medium">Our work</p>
      <h1 className="section-title mt-3">Portfolio</h1>
      <p className="text-stone mt-4 max-w-lg">
        Browse completed and in-progress projects by category, or search for a
        location.
      </p>

      <div className="mt-12">
        <PortfolioGrid />
      </div>
    </section>
    <Footer />
  </>
);

export default PortfolioPage;
