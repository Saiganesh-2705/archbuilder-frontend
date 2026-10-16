import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

const infoCards = [
  {
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    title: "Contact us",
    lines: ["Phone 01: +91 74188 28814", "Phone 02: +91 90257 87074"],
  },
  {
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Message us",
    lines: ["hello@buildworks.co.in"],
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Opening hours",
    lines: ["Mon – Sat: 7:00 am – 8:00 pm", "Sunday: 9:00 am – 2:00 pm"],
  },
  {
    icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Our office",
    lines: ["349/B1 Vallam New Colony,", "Brindha Nagar, Chengalpattu,", "Tamil Nadu, India, 603001"],
  },
];

const ContactPage = () => (
  <>
    <Navbar />

    <PageHero
      eyebrow="// Get in touch"
      title="Contact Us"
      crumb="Contact Us"
      images={[
        "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      ]}
      labels={["Visit us", "Talk to us", "Start building"]}
      subtitle="Tell us about your plot and your plans. We reply within one working day with clear next steps."
      stat={{ end: 20, suffix: "K+", label: "Happy homeowners", body: "Families who trusted us with their homes." }}
      secondary={{ href: "tel:+917418828814", label: "Call +91 74188 28814" }}
    />

    <section className="container-px py-20 grid lg:grid-cols-2 gap-14">
      <Reveal>
        <span className="eyebrow">// Get in touch</span>
        <h1 className="section-title mt-4">Get in touch for project guidance.</h1>
        <p className="text-stone mt-4 max-w-md">
          Contact our team today for reliable support, clear communication,
          and professional assistance with your construction needs.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-8">
          {infoCards.map((c, i) => (
            <div key={c.title} className="group animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-11 h-11 rounded bg-amber flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.7">
                  <path d={c.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-display text-lg">{c.title}</p>
              {c.lines.map((l) => (
                <p key={l} className="text-stone text-sm mt-1">{l}</p>
              ))}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={150} className="bg-sand border border-line p-8 md:p-10 h-fit">
        <h2 className="font-display text-2xl text-center">Let's talk today</h2>
        <p className="text-stone text-sm text-center mt-2 mb-8">
          Send your details for a quick, reliable response.
        </p>
        <ContactForm />
      </Reveal>
    </section>
    <Footer />
  </>
);

export default ContactPage;
