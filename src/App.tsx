import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    Instagram,
    Twitter,
    Linkedin,
    Star,
    Quote,
    Menu,
    X,
    ArrowUpRight,
    Layers,
    Smartphone,
    Globe,
    Cpu,
    ArrowLeft,
    ExternalLink,
    Users,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import WhyWorkWithMe from './components/WhyWorkWithMe';
import SocialSidebar from './components/SocialSidebar';

// --- Helper Styles ---
const globalStyles = `
  :root {
    --header-height: 80px;
  }
`;

// Inject styles
const styleParams = document.createElement('style');
styleParams.innerHTML = globalStyles;
document.head.appendChild(styleParams);

// --- Global Data ---

const PROJECTS_DATA = [
    {
        id: "viewflix",
        title: "VIEWFLIX",
        desc: "Streaming Analytics Dashboard UX/UI",
        fullDesc: "VIEWFLIX is a comprehensive dashboard for streaming service providers to monitor real-time user engagement, peak traffic hours, and content performance metrics.",
        tags: ["Analytics Dashboard", "Data Visualization", "Figma", "Web Design"],
        image: "/VF/1.jpg",
        gallery: [
            "/VF/1.jpg",
            "/VF/2.png",
            "/VF/3.png",
            "/VF/4.png",
            "/VF/5.png",
            "/VF/6.png"
        ],
        details: {
            client: "ViewFlix Inc.",
            year: "2025",
            role: "Product Designer",
            duration: "3 Months"
        }
    },
    {
        id: "cv-genius",
        title: "CV Genius",
        desc: "Ai Resume Builder SaaS Landing Page UI/UX Design",
        fullDesc: "CV Genius is an AI-powered resume builder designed to help job seekers create ATS-optimized resumes in minutes. The landing page emphasizes simplicity, speed, and the power of AI assistance, guiding users from a 'blocked' state to 'hired' with confidence.",
        tags: ["SaaS UI/UX Design", "Landing Page Design", "Conversion-Focused Design", "UX Design", "Figma"],
        image: "/Cv/1.png",
        gallery: [
            "/Cv/1.png",
            "/Cv/2.png",
            "/Cv/3.png",
            "/Cv/4.png",
            "/Cv/5.webm"
        ],
        details: {
            client: "CV Genius",
            year: "2025",
            role: "Lead Designer",
            duration: "4 Weeks"
        }
    },
    {
        id: "aura-pods-pro",
        title: "AURA Pods Pro",
        desc: "Conversion-Focused Product Landing Page UX",
        fullDesc: "AURA Pods Pro required a high-conversion landing page that balanced technical specifications with lifestyle branding. The design focus was on tactile visual elements and a seamless user flow from feature discovery to checkout.",
        tags: ["Landing Page", "Web Design", "Figma", "Wireframing"],
        image: "/Aur/1.png",
        gallery: [
            "/Aur/1.png",
            "/Aur/2.png",
            "/Aur/3.png",
            "/Aur/4.png",
            "/Aur/5.webm"
        ],
        details: {
            client: "AURA Digital",
            year: "2025",
            role: "Lead UI/UX Designer",
            duration: "4 Weeks"
        }
    },
    {
        id: "upskillr",
        title: "UPSKILLR",
        desc: "EdTech SaaS Landing Page UI/UX Design",
        fullDesc: "UPSKILLR is a modern learning platform connecting professionals with industry-led micro-courses. The landing page uses bold typography and dynamic layouts to communicate growth, energy, and career advancement possibilities.",
        tags: ["SaaS UI/UX Design", "Landing Page Design", "Conversion-Focused Design", "UX Design", "Figma"],
        image: "/Upskillr/1.png",
        gallery: [
            "/Upskillr/1.png",
            "/Upskillr/2.png",
            "/Upskillr/3.png",
            "/Upskillr/4.png",
            "/Upskillr/5.webm"
        ],
        details: {
            client: "Upskillr Tech",
            year: "2025",
            role: "UI/UX Designer",
            duration: "5 Weeks"
        }
    },
    {
        id: "nova-wallet",
        title: "NOVA Wallet",
        desc: "Personal Finance App Landing Page",
        fullDesc: "NOVA Wallet simplifies personal finance management with a sleek, dark-mode focused interface. The project involved designing a landing page that builds trust while showing off the app's modern, secure, and user-friendly features.",
        tags: ["UI/UX", "ui design", "landing page", "Web Design", "Figma", "UX design", "finance", "SAAS", "Fintech"],
        image: "/Nova/1.png",
        gallery: [
            "/Nova/1.png",
            "/Nova/2.png",
            "/Nova/3.png",
            "/Nova/4.png",
            "/Nova/5.webm"
        ],
        details: {
            client: "Nova FinTech",
            year: "2025",
            role: "Product Designer",
            duration: "6 Weeks"
        }
    },
    {
        id: "ek-analytics",
        title: "E.K Analytics",
        desc: "B2B Data Analytics Platform UX/UI",
        fullDesc: "E.K Analytics simplifies complex B2B data into actionable insights. The platform features customizable widgets and automated reporting tools for enterprise teams.",
        tags: ["Landing Page", "Web Design", "Figma", "Wireframing"],
        image: "/EK/1.png",
        gallery: [
            "/EK/1.png",
            "/EK/2.png",
            "/EK/3.png",
            "/EK/4.webm",
            "/EK/5.webm"
        ],
        details: {
            client: "EK Solutions",
            year: "2024",
            role: "UI/UX Consultant",
            duration: "6 Weeks"
        }
    },
    {
        id: "clarity-care",
        title: "CLARITY Care",
        desc: "Telehealth Platform UX/UI Design",
        fullDesc: "Clarity Care is a patient-first telehealth platform designed to bridge the gap between rural patients and specialist healthcare providers via secure video consultation.",
        tags: ["Landing Page", "Web Design", "Figma", "Wireframing"],
        image: "/Clar/1.png",
        gallery: [
            "/Clar/1.png",
            "/Clar/2.png",
            "/Clar/3.png",
            "/Clar/4.png",
            "/Clar/5.webm"
        ],
        details: {
            client: "Clarity Health",
            year: "2024",
            role: "Product Designer",
            duration: "2 Months"
        }
    },
    {
        id: "aurea-residences",
        title: "Aurea Residences",
        desc: "Luxury Real Estate Website UI Design",
        fullDesc: "Aurea Residences represents the pinnacle of luxury living. The website design matches the property's elegance with sophisticated typography, immersive imagery, and a seamless booking and inquiry flow for high-net-worth individuals.",
        tags: ["real estate", "UI/UX", "ui design", "landing page", "Web Design", "ux", "web development", "Website Design", "Figma", "UX design"],
        image: "/Aurea/1.png",
        gallery: [
            "/Aurea/1.png",
            "/Aurea/2.png",
            "/Aurea/3.png",
            "/Aurea/4.png",
            "/Aurea/5.webm"
        ],
        details: {
            client: "Aurea Group",
            year: "2024",
            role: "Lead Designer",
            duration: "2 Months"
        }
    },
    {
        id: "moodra",
        title: "Moodra",
        desc: "Mental Health & Recovery Website UI Design",
        fullDesc: "Moodra is a compassionate digital space for mental health recovery. The design utilizes calming color palettes, accessible typography, and a supportive user journey to encourage users to seek help and access resources easily.",
        tags: ["UI/UX", "landing page", "Web Design", "Figma", "ui design", "web development", "Website Design", "mental health", "Health", "support"],
        image: "/Moodra/1.png",
        gallery: [
            "/Moodra/1.png",
            "/Moodra/2.png",
            "/Moodra/3.png",
            "/Moodra/4.png",
            "/Moodra/5.png",
            "/Moodra/6.png",
            "/Moodra/7.png",
            "/Moodra/8.png"
        ],
        details: {
            client: "Moodra Health",
            year: "2024",
            role: "UI/UX Designer",
            duration: "3 Months"
        }
    }
];

// --- Shared Components ---

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
        } else {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Delay for components to mount if navigating between pages
                setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [pathname, hash]);
    return null;
};

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left"
            style={{ scaleX }}
        />
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/#about" },
        { name: "Featured Work", href: "/#portfolio" },
        { name: "Full Portfolio", href: "/projects" }
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12 md:py-6 border-b border-white/5 ${isScrolled || isMobileMenuOpen ? 'bg-black/80 backdrop-blur-md border-white/10' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link
                        to="/"
                        className="w-12 h-12 md:w-16 md:h-16 relative z-[60]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <img src="/logo_v2.png" alt="Logo" className="w-full h-full object-contain" />
                    </Link>

                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Desktop Links */}
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
                        </div>

                        {/* Contact Me Button */}
                        <Link
                            to="/#contact"
                            className="hidden md:block px-6 py-2 border border-gold/50 text-gold text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-black transition-all duration-300 rounded-sm"
                        >
                            Contact Me
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white relative z-[60] p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[45] bg-black pt-28 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <Link
                                        to={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-serif text-white hover:text-gold transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Link
                                    to="/#contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-3xl font-serif text-gold"
                                >
                                    Contact Me
                                </Link>
                            </motion.div>
                        </div>

                        {/* Social Links in Mobile Menu */}
                        <div className="absolute bottom-12 left-6 right-6 flex justify-between items-center border-t border-white/10 pt-8">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold">Get In Touch</span>
                            <div className="flex gap-6">
                                <Instagram className="w-5 h-5 text-muted-foreground hover:text-gold cursor-pointer transition-colors" />
                                <Twitter className="w-5 h-5 text-muted-foreground hover:text-gold cursor-pointer transition-colors" />
                                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-gold cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-black pt-24 pb-8 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Brand & Nav Columns */}
                    <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Logo/Brand */}
                        <div className="space-y-6">
                            <Link to="/" className="w-12 h-12 block">
                                <img src="/logo_v2.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert opacity-40" />
                            </Link>
                </div>

                        {/* Nav 1 + Business Inquiries */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold font-sans">Menu</h4>
                                <ul className="space-y-4">
                                    {[{ label: 'Home', path: '/#home' },
                                    { label: 'About Me', path: '/#about' },
                                    { label: 'Services', path: '/#services' },
                                    { label: 'Projects', path: '/projects' }].map((item) => (
                                        <li key={item.label}>
                                            <Link to={item.path} className="text-sm font-sans text-muted-foreground hover:text-gold transition-colors">
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Business inquiries</span>
                                <p className="text-sm font-sans text-white/80">chachaw220@gmail.com</p>
                            </div>
                        </div>

                        {/* Nav 2 + WhatsApp */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold font-sans">Social</h4>
                                <ul className="space-y-4">
                                    {[{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohamed-ashraf-4b82551b7/' },
                                    { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~01694abc04cb3923c0' },
                                    { name: 'Behance', url: 'https://www.behance.net/modikhadra' },
                                    { name: 'Instagram', url: 'https://www.instagram.com/modikhadra/' }].map((item) => (
                                        <li key={item.name}>
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-sans text-muted-foreground hover:text-gold transition-colors">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">What's App</span>
                                <p className="text-sm font-sans text-white/80">+20 111 012 5361</p>
                            </div>
                        </div>
                    </div>

                    {/* Large Brand Headline */}
                    <div className="lg:col-span-6 lg:text-right">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white/10 leading-none select-none">
                            Let's build <br />
                            The future
                        </h2>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[10px] uppercase tracking-widest text-white/20 text-center flex-1">
                        DESIGN BY MOHAMED ASHRAF COPYRIGHT © 2026. ALL RIGHTS RESERVED.
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-gold hover:border-gold transition-all duration-300 group"
                        title="Scroll to top"
                    >
                        <ArrowUpRight className="w-5 h-5 -rotate-45 group-hover:translate-y-[-2px] transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

// --- Page Components ---

const Hero = () => {
    const roles = ["Brand Designer", "Web Developer", "Product Manager", "Product Engineer"];
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-[var(--header-height)] mt-[21px]">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Content */}
                <div className="lg:col-span-12 lg:grid lg:grid-cols-12 items-center gap-12">
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-gold font-sans uppercase tracking-[0.3em] text-sm mb-4">Hey, I'm Mohamed Ashraf</h2>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
                                UI/UX & <br />
                                <div className="inline-block relative">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={roleIndex}
                                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                                            animate={{ clipPath: "inset(0 0% 0 0)" }}
                                            exit={{ clipPath: "inset(0 0 0 100%)" }}
                                            transition={{ duration: 0.8, ease: "easeInOut" }}
                                            className="text-gradient-gold inline-block whitespace-nowrap"
                                        >
                                            {roles[roleIndex]}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed font-sans"
                        >
                            Transforming complex ideas into stunning, intuitive digital experiences that resonate with users and elevate brands.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap gap-6 items-center"
                        >
                            <a
                                href="#contact"
                                className="px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-hover transition-all duration-300 glow-gold-hover rounded-sm text-center"
                            >
                                Contact Me
                            </a>
                            <a
                                href="#portfolio"
                                className="flex items-center gap-2 group text-sm uppercase tracking-widest font-bold border-b border-transparent hover:border-gold transition-all duration-300 py-2"
                            >
                                View Work <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Content - Profile Image & Stats */}
                    <div className="lg:col-span-5 flex flex-col md:flex-row items-center gap-8 lg:gap-12 mt-12 lg:mt-0 lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-72 h-72 md:w-80 md:h-80 xl:w-96 xl:h-96"
                        >
                            {/* Gold Ring Decoration */}
                            <div className="absolute inset-[-20px] border border-gold/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute inset-[-10px] border border-gold/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-gold/30 glow-gold relative z-10">
                                <img
                                    src="/mohamed_profile.jpg"
                                    alt="Mohamed Ashraf - UI/UX Designer"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </motion.div>

                        {/* Vertically Stacked Stats */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="bg-card/80 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-1 shadow-2xl min-w-[160px]"
                            >
                                <div className="text-3xl font-serif text-gold font-bold">6+</div>
                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Years Experience</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="bg-card/80 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-1 shadow-2xl min-w-[160px]"
                            >
                                <div className="text-3xl font-serif text-gold font-bold">120+</div>
                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Projects Delivered</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4, duration: 0.8 }}
                                className="bg-card/80 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-1 shadow-2xl min-w-[160px]"
                            >
                                <div className="text-3xl font-serif text-gold font-bold">99%</div>
                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Satisfaction</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.6, duration: 0.8 }}
                                className="bg-card/80 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-1 shadow-2xl min-w-[160px]"
                            >
                                <div className="text-3xl font-serif text-gold font-bold">50+</div>
                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Global Clients</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent"></div>
            </motion.div>
        </section>
    );
};

const Services = () => {
    const items = [
        {
            title: "User-Centered Design",
            desc: "Creating intuitive interfaces focused on solving real user problems through research and empathy.",
            icon: <Layers className="text-gold w-8 h-8" />
        },
        {
            title: "Brand Identity & Strategy",
            desc: "Developing cohesive brand systems that tell a story and build lasting connections with audiences.",
            icon: <Globe className="text-gold w-8 h-8" />
        },
        {
            title: "Responsive & Modern UI",
            desc: "Designing pixel-perfect layouts that work seamlessly across all devices and screen sizes.",
            icon: <Smartphone className="text-gold w-8 h-8" />
        },
        {
            title: "Outcome-Focused",
            desc: "Bringing ideas to life with interactive prototypes that validate concepts before development.",
            icon: <Cpu className="text-gold w-8 h-8" />
        }
    ];

    return (
        <section id="services" className="py-32 px-6 md:px-12 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((service, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="p-8 bg-card border border-white/5 group hover:border-gold/30 transition-all duration-500 relative"
                        >
                            <div className="mb-6">{service.icon}</div>
                            <h3 className="text-lg md:text-xl font-serif mb-4 group-hover:text-gold transition-colors whitespace-nowrap">{service.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold glow-gold"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const About = () => {
    return (
        <section id="about" className="py-32 px-6 md:px-12 bg-deep-black overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <span className="text-gold font-sans uppercase tracking-[0.3em] text-sm block">About Me</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-white/90">
                            A Designer Who is <br />
                            Focused on <span className="text-gold italic">Clarity</span> <br />
                            and Real Impact
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-8"
                    >
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 group text-sm uppercase tracking-widest font-bold border-b border-gold pb-2 hover:text-gold transition-all duration-300"
                        >
                            View Work <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-end">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <p className="text-muted-foreground text-lg leading-relaxed font-light">
                            I’m a UI/UX and product designer focused on turning complex ideas into clear, scalable digital experiences, blending strategy, research, and design systems to help products grow, perform, and serve real user needs globally.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed font-light">
                            I work closely with founders, teams, and stakeholders, balancing business goals with user needs through thoughtful execution, fast iteration, and clear communication, delivering work that looks refined, functions smoothly, and scales over time.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Portfolio = () => {
    // Filter Featured Work: Viewflix, Aura Pods Pro, E.K Analytics, Clarity Care
    const featuredProjects = PROJECTS_DATA.filter(p =>
        ["viewflix", "aura-pods-pro", "ek-analytics", "clarity-care"].includes(p.id)
    );

    return (
        <section id="portfolio" className="py-32 px-6 md:px-12 bg-black">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-6xl font-bold font-serif italic">
                            Featured <span className="text-gold">Work</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl font-sans">
                            A collection of case studies focusing on UX research and high-fidelity UI design.
                        </p>
                    </div>
                    <Link
                        to="/projects"
                        className="flex items-center gap-2 group text-sm uppercase tracking-[0.2em] font-bold border-b border-white/10 hover:border-gold transition-all duration-300 pb-2"
                    >
                        View all projects <span className="text-gold group-hover:translate-x-1 transition-transform inline-block"> &gt; </span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {featuredProjects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link to={`/project/${project.id}`}>
                                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/5 group-hover:border-gold/30 transition-all duration-500 mb-6 bg-card relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="px-6 py-2 bg-gold text-black text-xs font-bold uppercase tracking-widest rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2">
                                            View Details <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-2xl font-bold text-white group-hover:text-gold transition-colors">{project.title}</h4>
                                        <p className="text-muted-foreground text-sm mt-1">{project.desc}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {project.tags.map((tag, tagIdx) => (
                                            <span key={tagIdx} className="px-3 py-1 border border-gold/30 text-gold text-[10px] uppercase tracking-widest font-bold rounded-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => {
    const testimonials = [
        {
            text: "Very quick, and top quality, exactly what I asked for!",
            tags: ["Reliable", "Committed to Quality"]
        },
        {
            text: "Perfect as usual Thanks Mohamed. Highly recommended",
            tags: ["Committed to Quality"]
        },
        {
            text: "Super! Mohamed finished the work in no time. High quality and super responsive! Highly recommended!",
            tags: ["Clear Communicator", "Committed to Quality", "Reliable"]
        },
        {
            text: "Talented, super responsive and high time respective. I surely will work with him again.",
            tags: ["Committed to Quality", "Clear Communicator", "Collaborative"]
        },
        {
            text: "Excellent work from a professional freelancer. Thanks and looking forward to working together soon.",
            tags: ["Committed to Quality", "Professional", "Collaborative"]
        }
    ];

    return (
        <section className="py-32 px-6 md:px-12 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-6xl font-serif">
                        What My <span className="text-gold">Clients Say</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
                        Trusted by industry leaders and innovative startups to deliver high-impact digital solutions.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-card/40 backdrop-blur-sm border-2 border-white/5 p-10 rounded-2xl space-y-6 relative group hover:border-gold transition-all duration-500"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                    ))}
                                </div>
                                <Quote className="w-8 h-8 text-gold/20 group-hover:text-gold/40 transition-colors" />
                            </div>

                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic font-serif">
                                "{t.text}"
                            </p>

                            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                                {t.tags.map((tag, tagIdx) => (
                                    <span key={tagIdx} className="px-3 py-1 border border-gold/20 text-gold text-[10px] uppercase tracking-widest font-bold rounded-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section id="contact" className="py-32 px-6 md:px-12 bg-deep-black relative overflow-hidden">
            {/* Background Decoration - Animated Glow */}
            <motion.div
                animate={{
                    scale: isHovered ? 1.2 : 1,
                    backgroundColor: isHovered ? "rgba(161, 120, 0, 0.12)" : "rgba(161, 120, 0, 0.08)"
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none"
            />

            <div className="max-w-3xl mx-auto space-y-12 relative z-10">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-6xl font-serif">Let's create something <span className="text-gold italic">extraordinary</span> together</h2>
                    <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto font-sans leading-relaxed">
                        Available for freelance projects, product design roles, and long-term collaboration.
                    </p>
                </div>

                {/* Contact Form Card */}
                <motion.div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="bg-black backdrop-blur-xl border border-white/5 p-6 md:p-10 rounded-2xl shadow-2xl hover:border-gold/20 hover:shadow-[0_0_50px_rgba(161,120,0,0.1)] transition-all duration-700"
                >
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        {/* Name Field Group */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-widest text-white/50">Name (required)</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-lg placeholder:text-white/20"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-lg placeholder:text-white/20"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-widest text-white/50">Email (required)</label>
                            <input
                                type="email"
                                className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-lg placeholder:text-white/20"
                                required
                            />
                        </div>

                        {/* WhatsApp Field */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-widest text-white/50">My Whatsapp Number (optional)</label>
                            <input
                                type="tel"
                                className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-lg placeholder:text-white/20"
                            />
                        </div>

                        {/* Message Field */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-widest text-white/50">Message (required)</label>
                            <textarea
                                rows={4}
                                className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-gold transition-colors text-lg placeholder:text-white/20 resize-none"
                                required
                            ></textarea>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="bg-white text-black font-bold uppercase tracking-[0.2em] px-12 py-4 rounded-sm hover:bg-gold hover:text-black transition-all duration-300 transform active:scale-95 glow-white-hover"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </motion.div>

                <div className="pt-8 text-center">
                    <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] font-medium">
                        Designed with <span className="text-gold">purpose</span>. Built to perform.
                    </p>
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <main>
            <Hero />
            <Services />
            <About />
            <WhyWorkWithMe />
            <Portfolio />
            <Testimonials />
            <Contact />
        </main>
    );
};

const ProjectsPage = () => {
    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors group mb-8"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-bold">Back to Home</span>
                </Link>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-7xl font-serif">
                        Full <span className="text-gold italic">Portfolio</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl font-sans">
                        A complete archive of digital experiences, brand identities, and product design systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
                    {PROJECTS_DATA.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden group hover:border-gold/30 transition-all duration-500"
                        >
                            <Link to={`/project/${project.id}`}>
                                <div className="aspect-video w-full overflow-hidden relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="px-6 py-2 bg-gold text-black text-xs font-bold uppercase tracking-widest rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2">
                                            View Details <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{project.title}</h3>
                                            <p className="text-muted-foreground text-sm mt-1">{project.desc}</p>
                                        </div>
                                        <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-gold transition-colors" />
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tags.map((tag, tagIdx) => (
                                            <span key={tagIdx} className="px-3 py-1 bg-white/5 text-white/60 text-[10px] uppercase tracking-widest rounded-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProjectDetail = () => {
    const { projectId } = useParams();
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Prevent scrolling when lightbox is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedImage]);

    if (!project) return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
            <h1 className="text-3xl font-serif">Project Not Found</h1>
            <Link to="/" className="text-gold underline">Go Back Home</Link>
        </div>
    );

    const scrollToGallery = () => {
        const gallery = document.getElementById('gallery');
        if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-black overflow-x-hidden relative">


            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
                {/* Top Back Link */}
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all mb-16"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Portfolio
                </Link>

                {/* Split Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <div className="space-y-8">
                        {/* Tag */}
                        <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-sm">
                            {project.tags[0]}
                        </span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-serif leading-tight"
                        >
                            {project.title.split(' ')[0]} <span className="text-gold italic">{project.title.split(' ').slice(1).join(' ')}</span>
                        </motion.h1>

                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {project.desc}
                        </p>

                        <div className="flex items-center gap-2 text-sm font-bold text-white/80">
                            <Users className="w-4 h-4 text-gold" />
                            {project.details.role}
                        </div>

                        <button
                            onClick={scrollToGallery}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all rounded-sm mt-4"
                        >
                            <ExternalLink className="w-4 h-4" /> View Gallery
                        </button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => setSelectedImage(project.image)}
                        className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-zoom-in group relative aspect-video"
                    >
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold border border-white/10">Click to enlarge</div>
                        </div>
                    </motion.div>
                </div>

                {/* Gallery Section */}
                <div id="gallery" className="space-y-12 mb-32">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-serif">Project Gallery</h2>
                        <p className="text-muted-foreground text-sm">Screenshots and visuals from this project</p>
                    </div>

                    <div className="relative group max-w-5xl mx-auto">
                        <div className="overflow-hidden rounded-xl border border-white/10 bg-card aspect-[16/10] relative shadow-2xl">
                            <AnimatePresence mode="wait">
                                {project.gallery.slice(1)[currentImage].endsWith('.webm') ? (
                                    <motion.video
                                        key={currentImage}
                                        src={project.gallery.slice(1)[currentImage]}
                                        initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        onClick={() => setSelectedImage(project.gallery.slice(1)[currentImage])}
                                        className="w-full h-full object-cover cursor-zoom-in"
                                    />
                                ) : (
                                    <motion.img
                                        key={currentImage}
                                        src={project.gallery.slice(1)[currentImage]}
                                        initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        onClick={() => setSelectedImage(project.gallery.slice(1)[currentImage])}
                                        className="w-full h-full object-cover cursor-zoom-in"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Arrow Buttons */}
                            <button
                                onClick={() => setCurrentImage((prev) => (prev - 1 + project.gallery.slice(1).length) % project.gallery.slice(1).length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 z-10"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setCurrentImage((prev) => (prev + 1) % project.gallery.slice(1).length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 z-10"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Counter */}
                            <div className="absolute bottom-4 left-6 text-xs font-bold tracking-widest bg-black/60 px-3 py-1 rounded-full border border-white/10">
                                {currentImage + 1} / {project.gallery.slice(1).length}
                            </div>
                        </div>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-6">
                            {project.gallery.slice(1).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImage(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${currentImage === idx ? 'bg-gold w-8' : 'bg-white/10 w-2 hover:bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Overview & Tech */}
                <div className="max-w-4xl mx-auto space-y-16 mb-32">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold font-serif">Project Overview</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {project.fullDesc}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold font-serif">Technologies Used</h3>
                        <div className="flex flex-wrap gap-3">
                            {project.tags.map((tag, idx) => (
                                <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-sm font-bold rounded-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center space-y-8 border-t border-white/5 pt-20">
                    <div className="space-y-4">
                        <h3 className="text-3xl md:text-5xl font-serif">Ready to start your project?</h3>
                        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                            Let's discuss how I can help bring your vision to life with the same attention to detail and results-driven approach.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/#contact"
                            className="px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest text-xs hover:bg-gold-hover transition-all rounded-sm min-w-[200px]"
                        >
                            Start a Project
                        </Link>
                        <Link
                            to="/projects"
                            className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-all rounded-sm min-w-[200px]"
                        >
                            View More Projects
                        </Link>
                    </div>
                </div>

                {/* Lightbox Overlay */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
                        >
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </motion.button>

                            {selectedImage.endsWith('.webm') ? (
                                <motion.video
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    src={selectedImage}
                                    autoPlay
                                    loop
                                    controls
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <motion.img
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    src={selectedImage}
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const AppContent = () => {
    return (
        <div className="min-h-screen bg-background text-foreground scroll-smooth overflow-x-hidden">
            <ScrollToTop />
            <ScrollProgress />
            <Navbar />
            <SocialSidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/project/:projectId" element={<ProjectDetail />} />
            </Routes>
            <Footer />
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
