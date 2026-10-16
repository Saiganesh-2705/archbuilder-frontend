import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand container-px">
      <div className="w-full max-w-sm bg-white/70 border border-ink/10 rounded-2xl p-8">
        <Link to="/" className="font-display text-lg">BuildWorks</Link>
        <h1 className="section-title text-2xl mt-4">Admin login</h1>
        <p className="text-stone text-sm mt-1">Manage projects and inquiries.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-stone">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-stone">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-ink/15 rounded-lg px-4 py-3 bg-white outline-none focus:border-ink"
            />
          </div>

          {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-stone mt-6">
          Seed default: admin@buildworks.com / Admin@12345 (from backend seed script)
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
