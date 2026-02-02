import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
    const allProjects = [
        {
            title: "AURA Pods Pro",
            desc: "Conversion-Focused Product Landing Page UX",
            tags: ["Landing Page", "Web Design", "Figma"],
            image: "/aura_pods_final.png"
        },
        {
            title: "VIEWFLIX",
            desc: "Streaming Analytics Dashboard UX/UI",
            tags: ["Analytics Dashboard", "Data Visualization", "Figma"],
            image: "/viewflix_final.jpg"
        },
        {
            title: "E.K Analytics",
            desc: "B2B Data Analytics Platform UX/UI",
            tags: ["Landing Page", "Web Design", "Figma"],
            image: "/ek_analytics_final.jpg"
        },
        {
            title: "CLARITY Care",
            desc: "Telehealth Platform UX/UI Design",
            tags: ["Landing Page", "Web Design", "Figma"],
            image: "/clarity_care_final.png"
        },
        // Additional projects for the "rest of work"
        {
            title: "Lumina CRM",
            desc: "Modern Sales & Operations Platform",
            tags: ["SaaS", "Enterprise", "UI Architecture"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
        },
        {
            title: "Vertex Mobile",
            desc: "Crypto Wallet & Exchange App",
            tags: ["Fintech", "Mobile App", "Interaction Design"],
            image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2340"
        }
    ];

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
                    {allProjects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden group hover:border-gold/30 transition-all duration-500"
                        >
                            <div className="aspect-video w-full overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="px-6 py-2 bg-gold text-black text-xs font-bold uppercase tracking-widest rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        View Case Study
                                    </button>
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
