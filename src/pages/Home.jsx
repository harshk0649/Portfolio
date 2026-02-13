import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, Stars, Float, Cloud, useScroll, ScrollControls, Scroll, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef, useState, useMemo, useEffect, Suspense, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import * as THREE from 'three';
import Steve from '../components/3d/Steve';

// --- Mobs & Assets ---

// Placeholder components for 3D Mobs - in real app would useGLTF
// We use simple geometric approximations that look like "Figures"
// SteveFigure removed as we now use the dedicated Steve component

const WolfFigure = forwardRef((props, ref) => (
    <group {...props} ref={ref}>
        <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[1, 1, 2]} />
            <meshStandardMaterial color="#e5e5e5" />
        </mesh>
        <mesh position={[0, 2, 0.8]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="#e5e5e5" />
        </mesh>
    </group>
));

// No DragonFigure needed


// --- Data ---
const SKILLS = [
    { name: "Java & Spring Boot", level: "Advanced", xp: "85%" },
    { name: "Django & Laravel", level: "Intermediate", xp: "75%" },
    { name: "Node.js & Express", level: "Intermediate", xp: "70%" },
    { name: "SQL & Data Modeling", level: "Strong", xp: "80%" },
    { name: "REST API Design", level: "Strong", xp: "85%" },
    { name: "Security Practices", level: "Working Knowledge", xp: "65%" }
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
        image: "public/images/sgf.png"
    },
    {
        title: "EzzApply",
        desc: "Swipe-based job discovery platform inspired by Tinder. Built React frontend with backend API integration and job interaction tracking.",
        type: "Full Stack",
        image: "public/images/ezzapply.png"
    },
    {
        title: "AI Image Generator",
        desc: "React-based AI tool integrated with OpenAI API to generate images from prompts with loading states and error handling.",
        type: "AI / Frontend",
        image: "public/images/ai.png"
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

    useFrame(() => {
        const r = scroll.offset;

        // Show Steve in Hero/About (0 - 0.3)
        if (steveRef.current) {
            steveRef.current.position.x = THREE.MathUtils.lerp(steveRef.current.position.x, r < 0.3 ? 3 : 15, 0.1);
            steveRef.current.rotation.y += 0.01;
        }

        // Show Wolf in Experience/Skills (0.3 - 0.7)
        if (wolfRef.current) {
            const isActive = r > 0.3 && r < 0.7;
            wolfRef.current.position.x = THREE.MathUtils.lerp(wolfRef.current.position.x, isActive ? -3 : -15, 0.1);
        }

        // No Dragon
    });

    return (
        <group>
            <Steve ref={steveRef} position={[15, -2, 0]} scale={3} rotation={[0, -0.5, 0]} />
            <WolfFigure ref={wolfRef} position={[-15, -2, 0]} scale={1.5} />
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
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="w-full flex justify-between items-center py-6 border-b border-white/10 mb-10 pointer-events-auto">
            <div className="text-lg font-bold text-white drop-shadow-md cursor-pointer" onClick={() => window.scrollTo(0, 0)}>Harsh.Dev</div>
            <div className="flex gap-3 md:gap-6 text-[8px] md:text-[14px] uppercase tracking-wider items-center">
                <button onClick={() => scrollTo('about')} className="hover:text-green-400">About</button>
                <button onClick={() => scrollTo('experience')} className="hover:text-orange-400">XP</button>
                <button onClick={() => scrollTo('skills')} className="hover:text-yellow-400">Skills</button>
                <button onClick={() => scrollTo('projects')} className="hover:text-blue-400">Projects</button>
                <button onClick={() => scrollTo('contact')} className="hover:text-red-400">Contact</button>
                <button onClick={() => navigate('/mylife')} className="px-3 py-1 bg-purple-600 rounded-sm hover:bg-purple-500 font-bold ml-2">
                    My Journey
                </button>
            </div>
        </div>
    )
};


const HtmlContent = ({ navigate }) => {
    return (
        <div className="w-full px-6 md:px-20 pb-40 font-['Press_Start_2P'] max-w-7xl mx-auto">

            {/* HEADER */}
            <HeaderNav navigate={navigate} />

            {/* HERO */}
            <section id="hero" className="min-h-[70vh] flex flex-col justify-center">
                <div className="flex flex-col">
                    <h1 className="text-4xl md:text-8xl mb-6 text-white drop-shadow-[4px_4px_0_#000] leading-tight italic">
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
            <section id="about" className="py-20 min-h-[60vh]">
                <SectionHeader title="My Info" />
                <div className="grid md:grid-cols-2 gap-8">
                    <MinecraftCard variant="glass">
                        <h3 className="text-sm text-green-400 mb-4">About Me</h3>
                        <p className="text-sm leading-9 text-gray-200 font-sans">
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

            {/* SKILLS */}
            <section id="skills" className="py-20 min-h-[60vh]">
                <SectionHeader title="Inventory & Stats" />
                <div className="grid md:grid-cols-2 gap-12">
                    <MinecraftCard variant="obsidian">
                        <h3 className="text-sm text-yellow-400 mb-6 font-bold">Skill Tree</h3>
                        {SKILLS.map((s, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between text-[10px] mb-2 uppercase tracking-tighter">
                                    <span>{s.name}</span>
                                    <span className="text-yellow-500">{s.level}</span>
                                </div>
                                <div className="h-3 bg-gray-900 border border-white/10 p-[1px]">
                                    <div className="h-full bg-gradient-to-r from-green-600 to-green-400" style={{ width: s.xp }}></div>
                                </div>
                            </div>
                        ))}
                    </MinecraftCard>

                    <div className="flex flex-col gap-8">
                        <div className="bg-[#8b8b8b] p-6 border-4 border-[#373737] rounded-sm shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-20 text-4xl">📚</div>
                            <h3 className="text-[12px] text-black mb-4 uppercase font-bold border-b border-black/20 pb-2">Certifications</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {['Distributed System Fundamentals', 'API Lifecycle Management', 'Data Integrity & Consistency', 'Backend Threat Mitigation'].map((c, i) => (
                                    <div key={i} className="bg-[#a0a0a0] p-3 border-2 border-[#505050] text-[11px] text-center flex items-center justify-center font-bold text-[#1f1f1f] shadow-inner hover:bg-[#b0b0b0] transition-colors">
                                        {c}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {ACHIEVEMENTS.map((ach, i) => (
                                <div key={i} className="bg-black/40 border border-white/10 p-3 text-center rounded-sm">
                                    <div className="text-2xl mb-2">{ach.icon}</div>
                                    <div className="text-[8px] text-white uppercase">{ach.title}</div>
                                </div>
                            ))}
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
            <section id="contact" className="py-20 min-h-[60vh]">
                <SectionHeader title="Contact Me" />
                <div className="max-w-2xl mx-auto">
                    <MinecraftCard variant="obsidian" className="text-center p-8 md:p-12">
                        <h2 className="text-lg font-bold text-purple-400 mb-8 lowercase italic">Email: harshkhatri.cse.gndu@gmail.com</h2>
                        <div className="space-y-4 mb-8">
                            <input className="w-full bg-black/40 border-2 border-[#5a4875] p-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-400 transition-all" placeholder="Enter Your Name..." />
                            <textarea className="w-full bg-black/40 border-2 border-[#5a4875] p-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-400 h-40 resize-none transition-all" placeholder="Type your message..." />
                        </div>
                        <button className="w-full py-4 bg-purple-700 text-white font-bold hover:bg-purple-600 border-b-4 border-purple-900 active:border-b-0 active:translate-y-1 transition-all text-xs tracking-widest shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                            Here we Gooo ...
                        </button>
                    </MinecraftCard>
                </div>
            </section>

            {/* FOOTER - Ends exactly here */}
            <footer className="py-20 border-t-2 border-white/5 text-center">
                <div className="mb-8 flex justify-center gap-8 text-[10px] text-gray-500 uppercase tracking-widest">
                    <a href="https://www.linkedin.com/in/harshkhatri0649/" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://github.com/HarshKhatri0649" className="hover:text-white transition-colors">GitHub</a>
                    <a href="mailto:harshkhatri.cse.gndu@gmail.com" className="hover:text-white transition-colors">
                        Email
                    </a>                </div>
                <div className="text-[8px] text-gray-600 uppercase tracking-tighter">
                    <p>&copy; 2026 HARSH KHATRI. BUILT WITH CRAFT & CODE.</p>
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
                <ScrollControls pages={8} damping={0.2} style={{ width: '100vw', height: '100vh' }}>
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
