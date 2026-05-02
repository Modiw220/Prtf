import { Link } from 'react-router-dom';

const EmailIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const UpIcon = () => (
  <span className="text-xs font-bold uppercase tracking-widest">UP</span>
);

const LinkedinIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
  </svg>
);

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#my-services' },
  { name: 'Featured Work', href: '/#portfolio' },
  { name: 'Full Portfolio', href: '/projects' },
];

const staticFooterHeadlineStyle = {
  animation: 'none',
  transition: 'none',
  transform: 'none',
} as const;

export default function Footer() {
  return (
    <footer className="bg-black pt-16 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Top section with logo and text */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">
          {/* Left side: Logo and columns */}
          <div className="space-y-12">
            {/* Logo */}
            <div className="w-12 h-12">
              <img src="/logo_v2.png" alt="Logo" className="w-full h-full object-contain" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Quick Links</h4>
                <nav className="space-y-4">
                  {navLinks.slice(0, 3).map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block text-sm text-white/70 hover:text-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Explore</h4>
                <nav className="space-y-4">
                  {navLinks.slice(3).map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block text-sm text-white/70 hover:text-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Column 3 */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Connect</h4>
                <div className="flex items-center gap-3">
                  <a href="https://www.linkedin.com/in/mohamed-ashraf-4b82551b7/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                    <LinkedinIcon />
                  </a>
                  <a href="/#contact" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                    <EmailIcon />
                  </a>
                  <a href="https://www.upwork.com/freelancers/~01694abc04cb3923c0" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                    <UpIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Large text */}
          <div className="relative flex flex-col items-end justify-start pt-20">
            <div className="text-right space-y-0">
              <h3
                className="text-[100px] leading-[0.9] md:text-[100px] font-serif text-white/10"
                style={staticFooterHeadlineStyle}
              >
                Let's Paint
              </h3>
              <h3
                className="text-[100px] leading-[0.9] md:text-[100px] font-serif text-white/10"
                style={staticFooterHeadlineStyle}
              >
                Some Plans
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white/10 pt-6 text-center">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            Design by Mohamed Ashraf. Copyright © 2026.
          </div>
        </div>
      </div>
    </footer>
  );
}
