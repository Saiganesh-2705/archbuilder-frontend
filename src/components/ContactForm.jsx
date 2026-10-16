import { useState } from "react";
import { contactAPI } from "../services/api";

const initialForm = { name: "", email: "", phone: "", projectType: "", message: "" };

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Tell us a little about your project.";
    return e;
  };

  const handleChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const { data } = await contactAPI.submit(form);
      setStatus("success");
      setServerMessage(data.message || "Thanks — we'll be in touch soon.");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setServerMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-lg">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="text-sm text-stone">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white/60 focus:border-ink outline-none"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-stone">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white/60 focus:border-ink outline-none"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="text-sm text-stone">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white/60 focus:border-ink outline-none"
          />
        </div>
        <div>
          <label htmlFor="projectType" className="text-sm text-stone">
            Project type
          </label>
          <select
            id="projectType"
            value={form.projectType}
            onChange={handleChange("projectType")}
            className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white/60 focus:border-ink outline-none"
          >
            <option value="">Select one</option>
            <option>New build</option>
            <option>Renovation</option>
            <option>Landscape</option>
            <option>Commercial</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-stone">
          Tell us about your project
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
          className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white/60 focus:border-ink outline-none"
        />
        {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-60">
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {status === "success" && (
        <p className="text-emerald-600 font-medium text-sm" role="status">
          {serverMessage}
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm" role="alert">
          {serverMessage}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
