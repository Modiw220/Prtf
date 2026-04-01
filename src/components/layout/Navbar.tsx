import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#my-services' },
  { name: 'Featured Work', href: '/#portfolio' },
  { name: 'Full Portfolio', href: '/projects' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 md:px-12 md:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="w-12 h-12 md:w-16 md:h-16 relative z-[60]">
            <img src="/logo_v2.png" alt="Logo" className="w-full h-full object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs uppercase tracking-[0.2em] font-bold hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/#contact"
              className="px-6 py-2 border border-gold/50 text-gold text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-black transition-all duration-300 rounded-sm"
            >
              Contact Me
            </Link>
          </div>

          <button
            className="md:hidden text-white relative z-[60] p-2"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[45] bg-black pt-28 px-6 md:hidden">
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif text-white hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-serif text-gold"
            >
              Contact Me
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
