import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    Layers,
    Smartphone,
    Globe,
    Cpu,
    Star,
    Quote,
    Instagram,
    Twitter,
    Linkedin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 md:pt-[34px]">
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
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
                                UI/UX & <br />
                                <span className="text-gradient-gold">Brand Designer</span>
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
                                <div className="text-3xl font-serif text-gold font-bold">8+</div>
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
            title: "Seamless Prototyping",
            desc: "Bringing ideas to life with interactive prototypes that validate concepts before development.",
            icon: <Cpu className="text-gold w-8 h-8" />
        }
    ];

    return (
        <section className="py-32 px-6 md:px-12 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((service, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="p-8 bg-card border border-white/5 group hover:border-gold/30 transition-all duration-500 relative"
                        >
                            <div className="mb-6">{service.icon}</div>
                            <h3 className="text-xl font-serif mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
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
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight"
                    >
                        Designing <span className="text-gold italic">Brands</span> & <br />
                        Digital Experiences <br />
                        That Actually Work
                    </motion.h2>
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
                            I help brands and products translate complex ideas into clear, intuitive digital experiences that align user needs with business goals, creating meaningful value through thoughtful structure, clarity, and purpose across platforms.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed font-light">
                            By combining user research, strategic thinking, and precise execution, I design scalable solutions that balance aesthetics and performance, support long-term growth, and deliver consistent, measurable impact for real users and businesses.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Portfolio = () => {
    const projects = [
        {
            title: "AURA Pods Pro",
            desc: "Conversion-Focused Product Landing Page UX",
            tags: ["Landing Page", "Web Design", "Figma", "Wireframing"],
            image: "/aura_pods_final.png"
        },
        {
            title: "VIEWFLIX",
            desc: "Streaming Analytics Dashboard UX/UI",
            tags: ["Analytics Dashboard", "Data Visualization", "Figma", "Web Design"],
            image: "/viewflix_final.jpg"
        },
        {
            title: "E.K Analytics",
            desc: "B2B Data Analytics Platform UX/UI",
            tags: ["Landing Page", "Web Design", "Figma", "Wireframing"],
            image: "/ek_analytics_final.jpg"
        },
        {
            title: "CLARITY Care",
            desc: "Telehealth Platform UX/UI Design",
            tags: ["Landing Page", "Web Design", "Figma", "Wireframing"],
            image: "/clarity_care_final.png"
        }
    ];

    return (
        <section id="portfolio" className="py-32 px-6 md:px-12 bg-black">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-6xl font-bold font-serif italic">
                            Selected <span className="text-gold">Work</span>
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
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/5 group-hover:border-gold/30 transition-all duration-500 mb-6 bg-card">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                />
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
            name: "Sarah Jenkins",
            role: "CEO at TechFlow",
            text: "Working with Mohamed was a game-changer for our brand. He has an incredible eye for detail and really understands how to translate complex business goals into beautiful design.",
            avatar: "https://i.pravatar.cc/150?u=sarah"
        },
        {
            name: "David Chen",
            role: "Product Manager at Nexus",
            text: "The dashboard Mohamed designed for us is not only stunning but has significantly improved our user engagement metrics. Highly recommend his strategic approach.",
            avatar: "https://i.pravatar.cc/150?u=david"
        },
        {
            name: "Elena Rodriguez",
            role: "Founder of Bloom",
            text: "Mohamed delivered a brand identity that perfectly captures our vision. Professional, creative, and a true partner in our success. We couldn't be happier with the results.",
            avatar: "https://i.pravatar.cc/150?u=elena"
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-card/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl space-y-6 relative group hover:border-gold/20 transition-all duration-500"
                        >
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                ))}
                            </div>

                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/30">
                                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">{t.name}</h4>
                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.role}</p>
                                    </div>
                                </div>
                                <Quote className="w-8 h-8 text-gold/20 group-hover:text-gold/40 transition-colors" />
                            </div>

                            <p className="text-muted-foreground leading-relaxed italic">
                                "{t.text}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section id="contact" className="py-32 px-6 md:px-12 bg-deep-black relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
                <h2 className="text-4xl md:text-7xl font-serif">Let's create something <span className="text-gold italic">extraordinary</span> together.</h2>
                <p className="text-muted-foreground text-lg md:text-xl">Available for new projects and creative collaborations.</p>

                <div className="pt-8">
                    <a
                        href="mailto:hello@solt.design"
                        className="text-2xl md:text-4xl font-serif border-b-2 border-gold/30 hover:border-gold transition-all duration-300 pb-2 inline-block"
                    >
                        hello@solt.design
                    </a>
                </div>

                <div className="flex justify-center gap-8 pt-12">
                    <Instagram className="w-6 h-6 text-muted-foreground hover:text-gold cursor-pointer transition-colors" />
                    <Twitter className="w-6 h-6 text-muted-foreground hover:text-gold cursor-pointer transition-colors" />
                    <Linkedin className="w-6 h-6 text-muted-foreground hover:text-gold cursor-pointer transition-colors" />
                </div>
            </div>
        </section>
    );
};

export default function Home() {
    return (
        <main>
            <Hero />
            <Services />
            <About />
            <Portfolio />
            <Testimonials />
            <Contact />
        </main>
    );
}
