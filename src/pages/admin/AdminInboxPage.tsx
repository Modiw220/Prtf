import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getContactSubmissions,
  updateContactStatus,
  type ContactStatus,
  type ContactSubmissionRecord,
} from '../../lib/supabase/contacts';

const STATUS_OPTIONS: ContactStatus[] = ['new', 'in_progress', 'resolved', 'spam'];

export default function AdminInboxPage() {
  const [rows, setRows] = useState<ContactSubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | ContactStatus>('all');
  const [search, setSearch] = useState('');

  async function load() {
    try {
      setLoading(true);
      const data = await getContactSubmissions();
      setRows(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not load inbox.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((item) => {
      const statusMatch = statusFilter === 'all' || item.status === statusFilter;
      const text = `${item.full_name} ${item.email} ${item.message}`.toLowerCase();
      return statusMatch && (!q || text.includes(q));
    });
  }, [rows, search, statusFilter]);

  async function handleStatusChange(id: string, status: ContactStatus) {
    await updateContactStatus(id, status);
    await load();
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-serif">Contact Inbox</h1>
            <p className="text-muted-foreground mt-2">Manage incoming contact submissions and response status.</p>
          </div>
          <Link to="/admin" className="px-5 py-3 border border-white/20 text-xs uppercase tracking-widest font-bold rounded-sm">
            Back to Dashboard
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <input
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="md:col-span-2 bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'all' | ContactStatus)}
            className="bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          >
            <option value="all">All statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="text-muted-foreground">Loading inbox...</p>}
        {error && <p className="text-destructive text-sm">{error}</p>}

        {!loading && !error && (
          <div className="space-y-3">
            {filtered.map((item) => (
              <article key={item.id} className="border border-white/10 rounded-xl p-4 space-y-3 bg-card/20">
                <div className="flex flex-wrap gap-3 justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold">{item.full_name}</h2>
                    <p className="text-sm text-white/70">{item.email}</p>
                    {item.whatsapp && <p className="text-sm text-white/60">WhatsApp: {item.whatsapp}</p>}
                  </div>
                  <select
                    value={item.status}
                    onChange={(event) => {
                      void handleStatusChange(item.id, event.target.value as ContactStatus);
                    }}
                    className="bg-black border border-white/15 rounded p-2 text-xs uppercase tracking-widest"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{item.message}</p>
              </article>
            ))}
            {!filtered.length && <p className="text-muted-foreground">No messages match your filter.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
