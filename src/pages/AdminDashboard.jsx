import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { projectsAPI, contactAPI } from "../services/api";

const emptyProject = {
  title: "",
  location: "",
  category: "Residential",
  description: "",
  coverImage: "",
  year: "",
  area: "",
  client: "",
  featured: false,
  stage: "Completed",
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("projects");

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);

  const loadProjects = () => {
    setProjectsLoading(true);
    projectsAPI
      .getAll({ limit: 100 })
      .then(({ data }) => setProjects(data.projects))
      .catch(() => {})
      .finally(() => setProjectsLoading(false));
  };

  const loadContacts = () => {
    setContactsLoading(true);
    contactAPI
      .getAll()
      .then(({ data }) => setContacts(data))
      .catch(() => {})
      .finally(() => setContactsLoading(false));
  };

  useEffect(() => {
    loadProjects();
    loadContacts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleFormChange = (field) => (ev) => {
    const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyProject);
    setEditingId(null);
    setImageFile(null);
    setFormMessage("");
  };

  const startEdit = (project) => {
    setForm({
      title: project.title || "",
      location: project.location || "",
      category: project.category || "Residential",
      description: project.description || "",
      coverImage: project.coverImage || "",
      year: project.year || "",
      area: project.area || "",
      client: project.client || "",
      featured: project.featured || false,
      stage: project.stage || "Completed",
    });
    setEditingId(project._id);
    setFormMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSaving(true);
    setFormMessage("");
    try {
      let coverImage = form.coverImage;

      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);
        const { data } = await projectsAPI.upload(fd);
        coverImage = data.url;
      }

      const payload = { ...form, coverImage, year: form.year ? Number(form.year) : undefined };

      if (editingId) {
        await projectsAPI.update(editingId, payload);
        setFormMessage("Project updated.");
      } else {
        await projectsAPI.create(payload);
        setFormMessage("Project created.");
      }

      resetForm();
      loadProjects();
    } catch (err) {
      setFormMessage(err.response?.data?.message || "Something went wrong saving this project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    try {
      await projectsAPI.remove(id);
      loadProjects();
    } catch (err) {
      alert(err.response?.data?.message || "Couldn't delete this project.");
    }
  };

  const handleContactStatus = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status);
      loadContacts();
    } catch {
      // ignore
    }
  };

  const handleContactDelete = async (id) => {
    if (!window.confirm("Delete this submission?")) return;
    try {
      await contactAPI.remove(id);
      loadContacts();
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-sand">
      <header className="bg-ink text-white">
        <div className="container-px h-20 flex items-center justify-between">
          <div>
            <Link to="/" className="font-display text-lg">BuildWorks</Link>
            <p className="text-white/60 text-xs">Signed in as {user?.name} ({user?.email})</p>
          </div>
          <button onClick={handleLogout} className="btn-secondary !border-white/30 !text-white hover:!border-white">
            Log out
          </button>
        </div>
      </header>

      <div className="container-px py-10">
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => setTab("projects")}
            className={`px-4 py-2 rounded-full text-sm border ${
              tab === "projects" ? "bg-ink text-white border-ink" : "border-ink/20"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setTab("contacts")}
            className={`px-4 py-2 rounded-full text-sm border ${
              tab === "contacts" ? "bg-ink text-white border-ink" : "border-ink/20"
            }`}
          >
            Inquiries {contacts.filter((c) => c.status === "new").length > 0 && (
              <span className="ml-1 text-amber font-semibold">({contacts.filter((c) => c.status === "new").length} new)</span>
            )}
          </button>
        </div>

        {tab === "projects" && (
          <div className="grid lg:grid-cols-[380px_1fr] gap-10">
            <form onSubmit={handleSubmit} className="bg-white/60 border border-ink/10 rounded-2xl p-6 space-y-4 h-fit">
              <h2 className="font-display text-lg">{editingId ? "Edit project" : "Add a project"}</h2>

              <div>
                <label className="text-sm text-stone">Title</label>
                <input required value={form.title} onChange={handleFormChange("title")} className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2 bg-white outline-none focus:border-ink" />
              </div>
              <div>
                <label className="text-sm text-stone">Location</label>
                <input required value={form.location} onChange={handleFormChange("location")} className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2 bg-white outline-none focus:border-ink" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-stone">Category</label>
                  <select value={form.category} onChange={handleFormChange("category")} className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2 bg-white outline-none focus:border-ink">
                    {["Residential", "Commercial", "Landscape", "Renovation", "Interior"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-stone">Stage</label>
                  <select value={form.stage} onChange={handleFormChange("stage")} className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2 bg-white outline-none focus:border-ink">
                    {["Ongoing", "Completed", "For Sale", "Interior"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-stone">Description</label>
                <textarea required rows={3} value={form.description} onChange={handleFormChange("description")} className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2 bg-white outline-none focus:border-ink" />
              </div>

              <div>
                <label className="text-sm text-stone">Cover image URL (or upload below)</label>
                <input value={form.coverImage} onChange={handleFormChange("coverImage")} placeholder="https://..." className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2 bg-white outline-none focus:border-ink" />
              </div>
              <div>
                <label className="text-sm text-stone">Or upload an image</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="mt-1 w-full text-sm" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-stone">Year</label>
                  <input type="number" value={form.year} onChange={handleFormChange("year")} className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2 bg-white outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="text-sm text-stone">Area</label>
                  <input value={form.area} onChange={handleFormChange("area")} placeholder="2,400 sq ft" className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2 bg-white outline-none focus:border-ink" />
                </div>
                <div>
                  <label className="text-sm text-stone">Client</label>
                  <input value={form.client} onChange={handleFormChange("client")} className="mt-1 w-full border border-ink/15 rounded-lg px-3 py-2 bg-white outline-none focus:border-ink" />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-stone">
                <input type="checkbox" checked={form.featured} onChange={handleFormChange("featured")} />
                Feature this project
              </label>

              {formMessage && <p className="text-sm text-emerald-600 font-medium">{formMessage}</p>}

              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                  {saving ? "Saving..." : editingId ? "Update project" : "Create project"}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div>
              <h2 className="font-display text-lg mb-4">All projects ({projects.length})</h2>
              {projectsLoading ? (
                <p className="text-stone text-sm">Loading...</p>
              ) : (
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div key={p._id} className="flex items-center gap-4 bg-white/60 border border-ink/10 rounded-xl p-3">
                      <img src={p.coverImage} alt={p.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{p.title}</p>
                        <p className="text-xs text-stone">{p.category} &middot; {p.location} {p.featured && "· Featured"}</p>
                      </div>
                      <button onClick={() => startEdit(p)} className="text-sm text-amber font-semibold">Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="text-sm text-red-600">Delete</button>
                    </div>
                  ))}
                  {projects.length === 0 && <p className="text-stone text-sm">No projects yet — add your first one.</p>}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "contacts" && (
          <div>
            <h2 className="font-display text-lg mb-4">Contact submissions ({contacts.length})</h2>
            {contactsLoading ? (
              <p className="text-stone text-sm">Loading...</p>
            ) : (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div key={c._id} className="bg-white/60 border border-ink/10 rounded-xl p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{c.name} &middot; <span className="text-stone font-normal">{c.email || c.phone}</span></p>
                        {c.phone && <p className="text-xs text-stone">{c.phone}</p>}
                        {c.projectType && <p className="text-xs text-stone">Project type: {c.projectType}</p>}
                        <p className="text-sm mt-2 max-w-xl">{c.message}</p>
                        <p className="text-xs text-stone mt-2">{new Date(c.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <select
                          value={c.status}
                          onChange={(e) => handleContactStatus(c._id, e.target.value)}
                          className="text-sm border border-ink/15 rounded-lg px-2 py-1 bg-white"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                        <button onClick={() => handleContactDelete(c._id)} className="text-xs text-red-600">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                {contacts.length === 0 && <p className="text-stone text-sm">No submissions yet.</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
