import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, Stars, Float, Cloud, useScroll, ScrollControls, Scroll, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef, useState, useMemo, useEffect, Suspense, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import * as THREE from 'three';
import Steve from '../components/3d/Steve';
import Dragon from '../components/3d/Dragon';
import Wolf from '../components/3d/Wolf';
import SkillInventory from '../components/SkillInventory';

// --- Mobs & Assets ---

// --- Data ---
const SKILLS = [
    { name: "Java & Spring Boot", xp: "85%", icon: "☕" },
    { name: "Django & Laravel", xp: "75%", icon: "🐍" },
    { name: "Node.js & Express", xp: "70%", icon: "🌳" },
    { name: "SQL & Data Modeling", xp: "80%", icon: "🗄️" },
    { name: "REST API Design", xp: "85%", icon: "🔌" },
    { name: "Security Practices", xp: "65%", icon: "🛡️" }
];


const EDU_DATA = [
    { title: "Master of Computer Science", school: "University of Tech", year: "2008 - 2010" },
    { title: "B.Tech Information Systems", school: "State College", year: "2004 - 2008" },
];

const PROJECTS = [
    {
        title: "SGF Portal",
        desc: "A full-stack project management system with role-based access control, task workflows, and secure backend architecture using Spring Boot and SQL.",
        type: "Full Stack / Backend",
        image: "images/sgf.png"
    },
    {
        title: "EzzApply",
        desc: "Swipe-based job discovery platform inspired by Tinder. Built React frontend with backend API integration and job interaction tracking.",
        type: "Full Stack",
        image: "images/ezzapply.png"
    },
    {
        title: "AI Image Generator",
        desc: "React-based AI tool integrated with OpenAI API to generate images from prompts with loading states and error handling.",
        type: "AI / Frontend",
        image: "images/ai.png"
    }
];


const EXPERIENCE = [
    {
        company: "Cybertron Technologies Pvt. Ltd",
        role: "Jr. Software Developer",
        period: "Feb 2025 – Present",
        desc: "Working on backend development using Spring Boot, Django, and Laravel. Designing RESTful APIs, implementing authentication & RBAC systems, optimizing SQL queries, and contributing to scalable admin dashboards and production-ready systems."
    },
    {
        company: "Solitaire Infosys",
        role: "MERN Stack Intern",
        period: "2024-2025",
        desc: "Developed full-stack features using MongoDB, Express.js, React, and Node.js. Built responsive UI components, integrated REST APIs, and worked on authentication workflows during internship training projects."
    },
    {
        company: "Guru Nanak Dev University, Amritsar",
        role: "B.Tech Computer Science & Engineering",
        period: "2021 – 2025",
        desc: "Graduated with CGPA 8.0/10.0. Built multiple academic and personal projects focused on backend systems, database design, and scalable web application development."
    }
];


const ACHIEVEMENTS = [
    {
        icon: "🔐",
        title: "Access Control Architect",
        desc: "Implemented secure JWT authentication & role-based authorization systems."
    },
    {
        icon: "🛡️",
        title: "API Security Hardening",
        desc: "Designed protected REST endpoints with validation, middleware & permission layers."
    },
    {
        icon: "🧠",
        title: "Secure Backend Design",
        desc: "Applied layered architecture to minimize attack surface in production systems."
    },
    {
        icon: "🗄️",
        title: "Data Integrity Enforcement",
        desc: "Structured relational databases with constraints, indexing & controlled access."
    },
    { icon: "⚙️", title: "Backend Threat Mitigation", desc: "Applied validation, error handling & input sanitization to reduce vulnerabilities." },
    { icon: "📊", title: "Database Security", desc: "Designed structured schemas with controlled access & query optimization." }
];


const BackgroundManager = ({ setBgTheme }) => {
    const scroll = useScroll();
    const { scene } = useThree();

    useEffect(() => {
        // Initialize background if null
        if (!scene.background) {
            scene.background = new THREE.Color('#87ceeb');
        }
        // Initialize fog if needed (though <fog> component usually handles this)
    }, [scene]);

    useFrame((state) => {
        const r = scroll.offset; // 0 to 1

        let theme = 'overworld';
        if (r > 0.15) theme = 'mining';
        if (r > 0.4) theme = 'nether';
        if (r > 0.7) theme = 'end';

        setBgTheme(theme);

        const colors = {
            overworld: new THREE.Color('#87ceeb'),
            sunset: new THREE.Color('#fd5e53'),
            nether: new THREE.Color('#3b0000'),
            end: new THREE.Color('#090014')
        };

        let target = colors.overworld;
        if (r > 0.1 && r < 0.35) target = colors.sunset;
        if (r >= 0.35 && r < 0.75) target = colors.nether;
        if (r >= 0.75) target = colors.end;

        if (state.scene.background && state.scene.background.isColor) {
            state.scene.background.lerp(target, 0.1);
        }

        if (state.scene.fog && state.scene.fog.color) {
            state.scene.fog.color.lerp(target, 0.1);
        }
    });

    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
};

const ScrollObjects = () => {
    const scroll = useScroll();
    const steveRef = useRef();
    const wolfRef = useRef();
    const dragonRef = useRef();

    const cloudsRef = useRef();

    const { size } = useThree();
    const isMobile = size.width < 768;

    useFrame((state) => {
        const r = scroll.offset;

        // --- Viewport Aware Camera FOV ---
        // Increase FOV on mobile to see more vertically
        state.camera.fov = isMobile ? 75 : 50;
        state.camera.updateProjectionMatrix();

        // --- Model Visibility & Positioning ---

        // 🟢 STEVE
        if (steveRef.current) {
            const visible = r < 0.12;
            const targetX = isMobile ? 2 : 10; // Center or right based on mobile
            steveRef.current.position.x = THREE.MathUtils.lerp(steveRef.current.position.x, visible ? targetX : 35, 0.1);
            steveRef.current.visible = steveRef.current.position.x < 32;
        }

        // 🟠 WOLF & CLOUDS
        if (wolfRef.current) {
            const isActive = r >= 0.2 && r < 0.65;
            const targetX = isMobile ? 0 : -10; // Center on mobile
            wolfRef.current.position.x = THREE.MathUtils.lerp(wolfRef.current.position.x, isActive ? targetX : -35, 0.1);
            wolfRef.current.visible = wolfRef.current.position.x > -32;
        }

        if (cloudsRef.current) {
            const isActive = r >= 0.2 && r < 0.8;
            cloudsRef.current.position.y = THREE.MathUtils.lerp(cloudsRef.current.position.y, isActive ? 0 : -50, 0.05);
            cloudsRef.current.visible = cloudsRef.current.position.y > -45;
        }

        // 🟣 DRAGON
        if (dragonRef.current) {
            const isActive = r >= 0.65;
            dragonRef.current.position.y = THREE.MathUtils.lerp(dragonRef.current.position.y, isActive ? -3 : -60, 0.05);
            dragonRef.current.position.z = THREE.MathUtils.lerp(dragonRef.current.position.z, isActive ? (isMobile ? -30 : -20) : -80, 0.05);
            dragonRef.current.visible = dragonRef.current.position.y > -58;
        }
    });

    return (
        <group>
            {/* Final adjusted scales & base positions for transitions */}
            <Steve ref={steveRef} position={[isMobile ? 0 : 35, -8.5, -10]} scale={0.6} rotation={[0, -0.5, 0]} />
            <Wolf ref={wolfRef} position={[isMobile ? 0 : -35, -4, -10]} scale={1} />
            <Dragon ref={dragonRef} position={[0, -60, -80]} scale={isMobile ? 0.12 : 0.15} />

            {/* Nether Decorative Clouds - Enhanced Placement */}
            <group ref={cloudsRef} position={[0, -50, 0]}>
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    {/* Layered clouds for better depth in Nether section */}
                    <Cloud position={[-18, 12, -35]} speed={0.2} opacity={0.35} args={[3, 2]} />
                    <Cloud position={[18, 15, -40]} speed={0.25} opacity={0.3} args={[3, 2]} />
                    <Cloud position={[-10, -5, -30]} speed={0.3} opacity={0.2} args={[4, 2]} />
                    <Cloud position={[12, -8, -45]} speed={0.15} opacity={0.25} args={[3, 2]} />
                </Float>
            </group>
        </group>
    )
}


// --- UI ---

const MinecraftCard = ({ children, className, variant = "glass" }) => (
    <div className={classNames(
        "p-6 relative transition-all duration-300 transform hover:scale-[1.01]",
        variant === "glass" && "bg-black/40 backdrop-blur-md border border-white/20 shadow-xl rounded-sm",
        variant === "obsidian" && "bg-[#120c1c] border-2 border-[#5a4875] shadow-2xl rounded-sm",
        className
    )}>
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/30" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/30" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/30" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/30" />
        {children}
    </div>
);

const SectionHeader = ({ title }) => (
    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white drop-shadow-[2px_2px_0_#000] text-center">{title}</h2>
);

// --- Custom Scroll Navigation ---
// Since we are inside <Scroll>, standard #anchors might break or get stuck.
// We use a simple ref-based scroll function to jump to approximate percentages.
// Or we just rely on the fact that <Scroll html> renders a standard div. 
// The "stuck at bottom" issue is often because ScrollControls calculates height based on pages.
// If pages=6 but content is shorter, you have empty space. 
// Improvement: Ensure pages prop matches content length.

const HeaderNav = ({ navigate }) => {
    const scroll = useScroll();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el && scroll.el) {
            const headerHeight = 80;
            const targetPos = el.offsetTop - headerHeight;
            scroll.el.scrollTo({ top: targetPos, behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const scrollToTop = () => {
        if (scroll.el) {
            scroll.el.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-10 py-6 pointer-events-auto">
            <div className="flex justify-between items-center bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-sm shadow-2xl">
                <div
                    className="text-lg md:text-xl font-bold text-white drop-shadow-md cursor-pointer hover:text-green-400 transition-all select-none"
                    onClick={scrollToTop}
                >
                    HARSH<span className="text-green-500">.</span>DEV
                </div>

                {/* Desktop Nav */}
                <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-widest items-center">
                    <button onClick={() => scrollTo('about')} className="hover:text-green-400 transition-colors">About</button>
                    <button onClick={() => scrollTo('skills')} className="hover:text-yellow-400 transition-colors">Skills</button>
                    <button onClick={() => scrollTo('projects')} className="hover:text-blue-400 transition-colors">Projects</button>
                    <button onClick={() => navigate('/resume')} className="hover:text-red-400 transition-colors">Resume</button>
                    <button
                        onClick={() => navigate('/mylife')}
                        className="px-4 py-2 bg-purple-600 rounded-sm hover:bg-purple-500 font-bold transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                    >
                        THE JOURNEY
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 border border-white/20 rounded bg-black/40"
                    aria-label="Toggle Menu"
                >
                    <div className={classNames("w-6 h-0.5 bg-white transition-all", isMenuOpen ? "rotate-45 translate-y-2" : "")}></div>
                    <div className={classNames("w-6 h-0.5 bg-white transition-all", isMenuOpen ? "opacity-0" : "")}></div>
                    <div className={classNames("w-6 h-0.5 bg-white transition-all", isMenuOpen ? "-rotate-45 -translate-y-2" : "")}></div>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={classNames(
                "lg:hidden fixed inset-x-4 top-24 bg-black/90 backdrop-blur-xl border border-white/10 p-8 rounded-sm transition-all duration-300 transform",
                isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
            )}>
                <div className="flex flex-col gap-8 text-center text-sm uppercase tracking-[0.2em]">
                    <button onClick={() => scrollTo('about')} className="text-gray-300 hover:text-green-400">About</button>
                    <button onClick={() => scrollTo('skills')} className="text-gray-300 hover:text-yellow-400">Skills</button>
                    <button onClick={() => scrollTo('projects')} className="text-gray-300 hover:text-blue-400">Projects</button>
                    <button onClick={() => navigate('/resume')} className="text-gray-300 hover:text-red-400">Resume</button>
                    <button
                        onClick={() => navigate('/mylife')}
                        className="w-full py-4 bg-purple-600 rounded-sm text-white font-bold shadow-lg"
                    >
                        THE JOURNEY
                    </button>
                </div>
            </div>
        </nav>
    );
};


const HtmlContent = ({ navigate }) => {
    return (
        <div className="w-full px-6 md:px-20 pb-[15vh] font-['Press_Start_2P'] max-w-7xl mx-auto">

            {/* HEADER */}
            <HeaderNav navigate={navigate} />

            {/* HERO */}
            <section id="hero" className="min-h-screen flex flex-col justify-center py-20">
                <div className="flex flex-col">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-6 text-white drop-shadow-[4px_4px_0_#000] leading-tight italic">
                        HARSH KHATRI
                    </h1>
                    <div className="text-sm md:text-xl bg-black/50 inline-block px-4 py-3 border-l-4 border-green-500 mb-8 max-w-fit">
                        <span className="text-green-400">Level 69 Software Engineer</span>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-4 w-48 bg-gray-800 border border-white/20">
                            <div className="h-full bg-green-500 w-[50%] shadow-[0_0_10px_#22c55e]"></div>
                        </div>
                        <span className="text-[10px] text-gray-400">HP: 50/100</span>
                    </div>
                </div>
            </section>

            {/* ABOUT ME */}
            <section id="about" className="py-20 min-h-screen scroll-mt-24">
                <SectionHeader title="My Info" />
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    <MinecraftCard variant="glass">
                        <h3 className="text-xs text-green-400 mb-4 tracking-widest uppercase">About Me</h3>
                        <p className="text-xs sm:text-sm leading-relaxed sm:leading-9 text-gray-200 font-sans">
                            Hi, I’m Harsh Khatri — a Backend Engineer focused on building scalable and secure backend systems.
                            With hands-on experience in Java and Spring Boot, I develop RESTful APIs, implement authentication and authorization systems, and design efficient relational databases. I currently work at Cybertron Technologies Pvt. Ltd, where I contribute to backend services powering real business workflows.
                            I enjoy turning complex requirements into clean, maintainable backend architectures. Whether it’s RBAC systems, optimized SQL queries, or structured service-layer design, I aim to build systems that are reliable, scalable, and production-ready.
                        </p>
                    </MinecraftCard>
                    <MinecraftCard variant="glass">
                        <h3 className="text-sm text-blue-400 mb-4">Core Attributes</h3>
                        <div className="space-y-4">

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-black/40 flex items-center justify-center border border-green-500/50">⚙️</div>
                                <div className="text-[10px]">Engine: RESTful API Development</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-black/40 flex items-center justify-center border border-red-500/50">🛡️</div>
                                <div className="text-[10px]">Security: Authentication & RBAC</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-black/40 flex items-center justify-center border border-yellow-500/50">🧠</div>
                                <div className="text-[10px]">Logic: Clean Service Architecture</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-black/40 flex items-center justify-center border border-blue-500/50">🗄️</div>
                                <div className="text-[10px]">Data: Optimized SQL & Modeling</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-black/40 flex items-center justify-center border border-purple-500/50">🚀</div>
                                <div className="text-[10px]">Performance: Scalable Backend Systems</div>
                            </div>

                        </div>
                    </MinecraftCard>

                </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="py-20 min-h-[60vh]">
                <SectionHeader title="Experience (XP)" />
                <div className="space-y-6">
                    {EXPERIENCE.map((exp, i) => (
                        <MinecraftCard key={i} variant="glass" className="border-l-4 border-orange-500">
                            <div className="flex flex-col md:flex-row justify-between mb-4">
                                <div>
                                    <h3 className="text-sm text-orange-400 mb-1">{exp.role}</h3>
                                    <p className="text-[10px] text-gray-400 italic">{exp.company}</p>
                                </div>
                                <div className="text-[8px] text-gray-500 mt-2 md:mt-0">{exp.period}</div>
                            </div>
                            <p className="text-xs leading-6 text-gray-300 font-sans">{exp.desc}</p>
                        </MinecraftCard>
                    ))}
                </div>
            </section>

            {/* SKILLS & INVENTORY */}
            <section id="skills" className="py-20 min-h-[90vh]">
                <SectionHeader title="Inventory & Skills" />

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Panel 1: Inventory (The Grid) */}
                    <SkillInventory skills={SKILLS} />

                    {/* Panel 2: Stats & Achievements (Professional List) */}
                    <div className="space-y-6">
                        <MinecraftCard variant="obsidian" className="p-8">
                            <h3 className="text-[#55FFFF] text-[10px] font-bold uppercase tracking-widest mb-6 pb-2 border-b border-white/10">Technical Milestones</h3>
                            <div className="space-y-6">
                                {ACHIEVEMENTS.slice(0, 4).map((ach, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-12 h-12 bg-white/5 border-2 border-white/10 flex items-center justify-center text-2xl group-hover:border-yellow-500 transition-all rounded-sm flex-shrink-0">
                                            {ach.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] text-white font-bold uppercase tracking-wider mb-1 group-hover:text-yellow-400 transition-colors">{ach.title}</h4>
                                            <p className="text-[9px] text-gray-500 leading-relaxed font-sans">{ach.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </MinecraftCard>

                        {/* Extra decorative panel to fill space */}
                        <div className="p-4 bg-black/20 border-2 border-white/5 text-center">
                            <span className="text-[8px] text-gray-600 uppercase font-bold tracking-[0.5em]">SYSTEM STATUS: OPTIMIZED</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="py-20 min-h-[60vh]">
                <SectionHeader title="My Projects" />
                <div className="grid md:grid-cols-3 gap-8">
                    {PROJECTS.map((p, i) => (
                        <MinecraftCard key={i} variant="glass" className="hover:bg-blue-900/10 group cursor-pointer h-full border-t-4 border-blue-500">
                            <div className="h-40 mb-6 border border-white/10 relative overflow-hidden">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            <h3 className="text-sm font-bold mb-3 text-blue-400">{p.title}</h3>
                            <p className="text-[15px] text-gray-400 font-sans leading-5">{p.desc}</p>
                            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[8px] text-gray-500">
                                <span>{p.type}</span>
                                <span className="text-blue-500/50 group-hover:text-blue-500 transition-colors">LAUNCH →</span>
                            </div>
                        </MinecraftCard>
                    ))}
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="py-20 min-h-[40vh]">
                <SectionHeader title="Contact Me" />
                <div className="max-w-2xl mx-auto px-4">
                    <MinecraftCard variant="obsidian" className="text-center p-8 md:p-12">
                        <h2 className="text-[10px] font-bold text-gray-500 mb-10 uppercase tracking-[0.3em] opacity-80">Access Granted. Connect with the Developer.</h2>

                        <div className="flex flex-wrap justify-center gap-6">
                            {[
                                {
                                    name: "GitHub",
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    ),
                                    color: "bg-white/5 border-white/20 hover:border-white/60",
                                    href: "https://github.com/HarshKhatri0649"
                                },
                                {
                                    name: "LinkedIn",
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#0077B5]">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    ),
                                    color: "bg-blue-600/5 border-blue-500/20 hover:border-blue-400/60",
                                    href: "https://www.linkedin.com/in/harshkhatri0649/"
                                },
                                {
                                    name: "Instagram",
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#E4405F]">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    ),
                                    color: "bg-pink-600/5 border-pink-500/20 hover:border-pink-400/60",
                                    href: "https://www.instagram.com/harshkhatri0649/"
                                },
                                {
                                    name: "Email",
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-purple-400">
                                            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 8.165h-18.796l5.53-8.16zm6.497-1.259l4.706-3.813v9.528l-4.706-5.715z" />
                                        </svg>
                                    ),
                                    color: "bg-purple-600/5 border-purple-500/20 hover:border-purple-400/60",
                                    href: "mailto:harshkhatri.cse.gndu@gmail.com"
                                }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classNames(
                                        social.color,
                                        "w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center border-2 transition-all p-2 rounded-sm relative group cursor-pointer shadow-lg"
                                    )}
                                >
                                    <span className="text-2xl group-hover:scale-110 transition-transform">{social.icon}</span>
                                    <span className="mt-2 text-[8px] font-bold text-white uppercase opacity-40 group-hover:opacity-100 transition-all tracking-wider">{social.name}</span>

                                    {/* Corner Accents */}
                                    <div className="absolute top-1 left-1 w-1 h-1 bg-white/10" />
                                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-black/40" />
                                </a>
                            ))}
                        </div>


                    </MinecraftCard>
                </div>
            </section>

            {/* FOOTER - Ends exactly here */}
            {/* FOOTER */}
            <footer className="py-20 border-t border-white/5 text-center">
                <div className="text-[8px] text-gray-600 uppercase tracking-[0.2em] space-y-2">
                    <p className="opacity-40 italic">Handcrafted with React & Three.js</p>
                    <p>&copy; 2026 HARSH KHATRI. ALL SYSTEMS OPERATIONAL.</p>
                </div>
            </footer>

        </div>
    );
};


const MainScene = () => {
    const [bgTheme, setBgTheme] = useState('overworld');
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen bg-[#000]">
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
                <fog attach="fog" args={['#87ceeb', 10, 50]} />
                <ScrollControls pages={7.2} damping={0.1} style={{ width: '100vw', height: '100vh' }}>
                    {/* Background & 3D Objects */}
                    <BackgroundManager setBgTheme={setBgTheme} />
                    <ScrollObjects />

                    {/* HTML Content */}
                    <Scroll html style={{ width: '100vw' }}>
                        <HtmlContent navigate={navigate} />
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    )
}

export default MainScene;
