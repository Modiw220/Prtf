import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-white/30 text-center">
            Design by Mohamed Ashraf. Copyright 2026.
          </p>
          <div className="flex gap-4 items-center">
            <Link to="/projects" className="text-xs uppercase tracking-widest text-gold hover:text-gold-hover">
              Portfolio
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUpRight className="w-5 h-5 -rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
