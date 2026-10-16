import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const FAQPage = () => (
  <>
    <Navbar />
    <PageHero
      eyebrow="// Got questions?"
      title="FAQ's"
      crumb="FAQ's"
      images={[
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
      ]}
      subtitle="Straight answers on pricing, timelines, materials and warranty."
      secondary={{ to: "/contact", label: "Ask us directly" }}
    />
    <FAQ />
    <Footer />
  </>
);

export default FAQPage;
