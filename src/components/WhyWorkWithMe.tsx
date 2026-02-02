
import { motion } from 'framer-motion';
import { Target, Zap, Layout, FileSearch, Lightbulb, TrendingUp } from 'lucide-react';

const WhyWorkWithMe = () => {
    const reasons = [
        {
            icon: Target,
            title: "Strategic Vision",
            desc: "I don't just design screens; I design business solutions. Every pixel is placed with a strategic purpose to drive conversion and user retention."
        },
        {
            icon: Zap,
            title: "Speed & Precision",
            desc: "Agile methodologies meet aesthetic perfection. I deliver high-quality production-ready assets without compromising on timelines."
        },
        {
            icon: Layout,
            title: "Scalable Systems",
            desc: "Building for today while planning for tomorrow. I create atomic design systems that grow with your product, ensuring consistency."
        },
        {
            icon: FileSearch,
            title: "User-Centric Data",
            desc: "Decisions backed by data, not guesses. I rely on user research and analytics to inform design choices that solve real problems."
        },
        {
            icon: Lightbulb,
            title: "Creative Innovation",
            desc: "Pushing boundaries with modern UI trends while maintaining usability standards. I bring a fresh, competitive edge to your brand."
        },
        {
            icon: TrendingUp,
            title: "Results Driven",
            desc: "My ultimate metric is your success. Whether it's increasing signup rates or reducing churn, I focus on the ROI of design."
        }
    ];

    return (
        <section className="py-20 md:py-32 px-6 md:px-12 bg-black relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Header */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                            My Value
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight"
                        >
                            Why <span className="text-gold italic">Work</span> <br /> With Me?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg leading-relaxed max-w-sm"
                        >
                            I bridge the gap between creative design and technical execution, ensuring your product looks great and performs flawlessly.
                        </motion.p>
                    </div>

                    {/* Grid */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reasons.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-gold/30 transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyWorkWithMe;
