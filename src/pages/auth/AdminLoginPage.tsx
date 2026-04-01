import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithPassword } from '../../lib/supabase/auth';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await signInWithPassword(email, password);
      const nextPath = (location.state as { from?: string } | null)?.from || '/admin';
      navigate(nextPath, { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 rounded-2xl p-8 bg-card/40">
        <h1 className="text-3xl font-serif mb-2">Admin Login</h1>
        <p className="text-muted-foreground text-sm mb-8">Sign in to manage portfolio content.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="space-y-2 block">
            <span className="text-xs uppercase tracking-widest text-white/60">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-black border border-white/15 rounded-lg p-3 focus:outline-none focus:border-gold"
            />
          </label>
          <label className="space-y-2 block">
            <span className="text-xs uppercase tracking-widest text-white/60">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-black border border-white/15 rounded-lg p-3 focus:outline-none focus:border-gold"
            />
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            disabled={loading}
            className="w-full px-6 py-3 bg-gold text-black font-bold uppercase tracking-widest text-xs rounded-sm disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
