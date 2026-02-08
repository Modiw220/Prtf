import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

export const BehanceIcon = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M23.235 15.302c.003-3.136-2.454-5.048-5.321-5.048-2.607 0-4.992 1.488-4.992 5.023 0 3.321 2.457 5.023 5.437 5.023 2.148 0 4.108-.941 4.752-2.301h-2.128c-.352.545-1.168 1.056-2.453 1.056-1.579 0-2.656-.848-2.656-2.421h7.361c.001-.115.001-.225 0-.332zm-7.387-1.196c.094-1.312 1.12-2.096 2.416-2.096 1.488 0 2.422.846 2.422 2.096h-4.838zM0 6.697v12.433h7.172c7.171 0 7.171-12.433 0-12.433H0zm2.744 2.416h3.193c3.551 0 3.551 3.25 0 3.25H2.744V9.113zm0 8.017V13.88h3.693c3.551 0 3.551 3.25 0 3.25H2.744zM14.931 7.172h6.561V8.58h-6.561v-1.408z" />
    </svg>
);

export const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.71 1.439h.005c6.554 0 11.89-5.335 11.893-11.892a11.826 11.826 0 00-3.48-8.413Z" />
    </svg>
);

export const UpworkIcon = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
);

const SocialSidebar = () => {
    const socials = [
        { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-ashraf-4b82551b7/", name: "LinkedIn" },
        { icon: UpworkIcon, href: "https://www.upwork.com/freelancers/~01694abc04cb3923c0", name: "Upwork" },
        { icon: BehanceIcon, href: "https://www.behance.net/modikhadra", name: "Behance" },
        { icon: WhatsAppIcon, href: "http://wa.me/+201110125361", name: "WhatsApp" },
        { icon: Instagram, href: "https://www.instagram.com/modikhadra/", name: "Instagram" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-8"
        >
            <div className="w-px h-24 bg-gradient-to-t from-gold to-transparent opacity-50" />
            <div className="flex flex-col gap-6">
                {socials.map((social, idx) => (
                    <motion.a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -4, scale: 1.1 }}
                        className="text-white/40 hover:text-gold transition-all duration-300"
                        title={social.name}
                    >
                        <social.icon className="w-5 h-5" />
                    </motion.a>
                ))}
            </div>
            <div className="w-px h-24 bg-gradient-to-b from-gold to-transparent opacity-50" />
        </motion.div>
    );
};

export default SocialSidebar;
