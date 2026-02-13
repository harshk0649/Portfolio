import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, Stars, Float, Cloud, useScroll, ScrollControls, Scroll } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import * as THREE from 'three';

// --- Assets & Data ---

const SKILLS = [
    { name: "Full Stack Dev", level: "Diamond", xp: "20 Years" },
    { name: "AI Engineering", level: "Netherite", xp: "8 Years" },
    { name: "System Design", level: "Gold", xp: "12 Years" },
    { name: "Cloud Arch", level: "Emerald", xp: "10 Years" },
];

const EXPERIENCE_LOG = [
    { title: "Senior Architect at TechCorp", date: "2018 - Present", desc: "Led migration of legacy monoliths to microservices." },
    { title: "Lead Developer at StartUpInc", date: "2014 - 2018", desc: "Built core product from 0 to 1M users." },
    { title: "Full Stack Eng at WebSolutions", date: "2010 - 2014", desc: "Developed high-traffic e-commerce platforms." },
];

const PROJECTS = [
    { title: "E-Commerce Core", type: "Enterprise", desc: "Scalable microservices handling 1M+ txns.", link: "#" },
    { title: "Neural Vision", type: "AI/ML", desc: "Real-time object detection for security.", link: "#" },
    { title: "Block Chain Ledger", type: "Web3", desc: "Decentralized identity management.", link: "#" },
];

// --- 3D Background System ---

const BackgroundManager = ({ setBgTheme }) => {
    const scroll = useScroll();
    const lightRef = useRef();

    useFrame((state) => {
        const r = scroll.offset; // 0 to 1

        let theme = 'overworld';
        if (r > 0.25) theme = 'mining';
        if (r > 0.5) theme = 'nether';
        if (r > 0.8) theme = 'end';

        setBgTheme(theme);

        // Dynamic Colors Interpolation
        const overworldColor = new THREE.Color('#87ceeb');
        const sunsetColor = new THREE.Color('#fd5e53');
        const netherColor = new THREE.Color('#3b0000');
        const endColor = new THREE.Color('#090014');

        let targetColor = overworldColor;

        if (r < 0.25) {
            targetColor = overworldColor.clone().lerp(sunsetColor, r / 0.25);
        } else if (r < 0.5) {
            targetColor = sunsetColor.clone().lerp(netherColor, (r - 0.25) / 0.25);
        } else if (r < 0.8) {
            targetColor = netherColor.clone().lerp(endColor, (r - 0.5) / 0.3);
        } else {
            targetColor = endColor;
        }

        state.scene.background = targetColor;
        if (state.scene.fog) state.scene.fog.color.lerp(targetColor, 0.1);
    });

    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight ref={lightRef} position={[10, 20, 10]} intensity={1} castShadow />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
};

// --- Floating Elements for visual depth ---
const BiomeParticles = ({ theme }) => {
    return (
        <group>
            {theme === 'overworld' && (
                <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Cloud opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} position={[0, 10, -20]} />
                </Float>
            )}
            {theme === 'nether' && (
                <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <mesh key={i} position={[Math.random() * 20 - 10, Math.random() * 20, -15]}>
                            <boxGeometry args={[0.5, 0.5, 0.5]} />
                            <meshStandardMaterial color="#ff4500" emissive="#ff0000" emissiveIntensity={2} />
                        </mesh>
                    ))}
                </Float>
            )}
            {theme === 'end' && (
                <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <mesh key={i} position={[Math.random() * 30 - 15, Math.random() * 30, -20]}>
                            <boxGeometry args={[0.2, 0.2, 0.2]} />
                            <meshStandardMaterial color="#d8bfd8" emissive="#8a2be2" emissiveIntensity={5} />
                        </mesh>
                    ))}
                </Float>
            )}
        </group>
    )
}

// --- UI Components ---

const MinecraftCard = ({ children, className, variant = "glass" }) => (
    <div className={classNames(
        "p-6 relative transition-all duration-300 transform hover:scale-[1.01]",
        variant === "glass" && "bg-black/40 backdrop-blur-md border border-white/20 shadow-xl rounded-sm",
        variant === "obsidian" && "bg-[#120c1c] border-2 border-[#5a4875] shadow-2xl rounded-sm",
        variant === "paper" && "bg-[#f2e6c9] border-4 border-[#8b5a2b] text-[#3e2723] rounded-sm",
        className
    )}>
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/30" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/30" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/30" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/30" />
        {children}
    </div>
);

const StatBar = ({ label, value, color }) => (
    <div className="mb-4">
        <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1 opacity-80">
            <span>{label}</span>
            <span>{value}</span>
        </div>
        <div className="h-4 bg-black/50 border border-white/10 p-0.5">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={classNames("h-full", color)}
            />
        </div>
    </div>
);

const SectionHeader = ({ title, subtitle }) => (
    <div className="mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-[2px_2px_0_#000]">{title}</h2>
        {subtitle && <p className="text-xs md:text-sm text-gray-300 bg-black/40 inline-block px-3 py-1 rounded">{subtitle}</p>}
    </div>
);

// --- Content Components ---

const HeaderNav = ({ navigate }) => (
    <div className="w-full flex justify-between items-center py-6 border-b border-white/10 mb-10">
        <div className="text-lg font-bold text-white drop-shadow-md">Notch.dev</div>
        <div className="flex gap-6 text-[10px] md:text-xs uppercase tracking-wider">
            <a href="#about" className="hover:text-green-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-yellow-400 transition-colors">Stats</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">Quest Log</a>
            <button onClick={() => navigate('/mylife')} className="text-purple-400 hover:text-purple-300 font-bold border-b border-purple-500">
                Play Mode
            </button>
        </div>
    </div>
);

const HtmlContent = ({ setBgTheme, navigate }) => {
    return (
        <div className="w-full px-6 md:px-20 pb-20 font-['Press_Start_2P'] max-w-7xl mx-auto">

            {/* HERO */}
            <section id="header" className="min-h-screen flex flex-col pt-10">
                <HeaderNav navigate={navigate} />
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 flex flex-col justify-center"
                >
                    <div className="w-20 h-20 bg-green-500 mb-6 border-4 border-black/50 shadow-lg animate-bounce"></div>
                    <h1 className="text-4xl md:text-7xl mb-6 text-white drop-shadow-[5px_5px_0_rgba(0,0,0,0.8)] leading-tight">
                        HARSH KHATRI
                    </h1>
                    <div className="text-sm md:text-xl bg-black/50 inline-block px-4 py-3 border-l-4 border-green-500 mb-8 max-w-fit">
                        <span className="text-green-400">Level 99 Architect</span>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/mylife')}
                            className="px-6 py-3 bg-[#5c9e6d] hover:bg-[#4a8a5b] text-white border-b-4 border-[#2e5e3a] active:border-b-0 active:mt-1 transition-all text-xs uppercase"
                        >
                            Start Game
                        </button>
                        <a href="#contact" className="px-6 py-3 bg-[#525252] hover:bg-[#404040] text-white border-b-4 border-[#262626] active:border-b-0 active:mt-1 transition-all text-xs uppercase decoration-0">
                            Connect
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* ABOUT ME */}
            <section id="about" className="py-20">
                <SectionHeader title="Player Info" subtitle="Bio data loaded" />
                <MinecraftCard variant="glass" className="p-8 md:p-12">
                    <p className="text-xs md:text-sm leading-8 text-gray-200 font-sans">
                        I am a passionate software engineer with over 20 years of experience in the server.
                        My journey began mining simple scripts and has evolved into architecting massive, scalable cloud infrastructures.
                        I specialize in building tools that help players (users) achieve their goals efficiently.
                        Just like in Minecraft, I believe in gathering the right resources and crafting widely resilient systems.
                    </p>
                </MinecraftCard>
            </section>

            {/* SKILLS / INVENTORY */}
            <section id="skills" className="py-20">
                <SectionHeader title="Inventory" subtitle="Equipped Skills" />
                <div className="grid md:grid-cols-2 gap-12">
                    <MinecraftCard variant="obsidian">
                        <h3 className="text-sm text-yellow-400 mb-6 border-b border-white/10 pb-2">Main Stats</h3>
                        {SKILLS.map((s, i) => (
                            <StatBar key={i} label={s.name} value={s.xp} color="bg-green-500" />
                        ))}
                    </MinecraftCard>

                    {/* Graphic Inventory Grid */}
                    <div className="bg-[#8b8b8b] p-4 border-4 border-[#373737] rounded">
                        <h3 className="text-[10px] text-white mb-2">Backpack</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <div key={i} className="aspect-square bg-[#8b8b8b] border-2 border-[#373737] inset-0 shadow-[inset_2px_2px_0_rgba(0,0,0,0.5),inset_-2px_-2px_0_rgba(255,255,255,0.2)] flex items-center justify-center hover:bg-[#a0a0a0] transition-colors cursor-help group relative">
                                    {i < 4 && <div className={`w-8 h-8 ${['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'][i]}`} />}
                                    {/* Tooltip */}
                                    {i < 4 && <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 bg-[#120c1c] text-white text-[8px] p-2 border border-purple-500 whitespace-nowrap z-10 mb-2">
                                        {['React.js', 'Node.js', 'Python', 'AWS'][i]}
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE / QUEST LOG */}
            <section id="experience" className="py-20">
                <SectionHeader title="Quest Log" subtitle="Completed Missions" />
                <div className="space-y-6">
                    {EXPERIENCE_LOG.map((exp, i) => (
                        <MinecraftCard key={i} variant="glass" className="border-l-4 border-l-yellow-500/50">
                            <div className="flex flex-col md:flex-row justify-between mb-2">
                                <h3 className="text-sm text-yellow-300 font-bold">{exp.title}</h3>
                                <span className="text-[10px] text-gray-400 bg-black/30 px-2 py-1 rounded">{exp.date}</span>
                            </div>
                            <p className="text-[10px] text-gray-300 font-sans">{exp.desc}</p>
                        </MinecraftCard>
                    ))}
                </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="py-20">
                <SectionHeader title="Constructs" subtitle="Deployed Worlds" />
                <div className="grid md:grid-cols-3 gap-8">
                    {PROJECTS.map((p, i) => (
                        <MinecraftCard key={i} variant="glass" className="hover:bg-red-900/20 hover:border-red-500/50 group cursor-pointer">
                            <div className="h-40 bg-black/40 mb-6 border border-white/10 flex items-center justify-center overflow-hidden">
                                <div className="text-4xl opacity-20 group-hover:scale-110 transition-transform duration-500">Map_{i + 1}</div>
                            </div>
                            <div className="text-[8px] font-bold text-orange-400 mb-2 uppercase tracking-wider">{p.type}</div>
                            <h3 className="text-sm font-bold mb-2">{p.title}</h3>
                            <p className="text-[10px] text-gray-400 mb-6 leading-relaxed font-sans">{p.desc}</p>
                        </MinecraftCard>
                    ))}
                </div>
            </section>

            {/* CONTACT / FOOTER */}
            <section id="contact" className="py-20 pb-40">
                <SectionHeader title="Comms Channel" subtitle="Open Frequency" />
                <div className="max-w-2xl mx-auto">
                    <MinecraftCard variant="paper" className="relative shadow-2xl">
                        <div className="text-center mb-8">
                            <h2 className="text-lg font-bold text-[#3e2723] mb-2">Book & Quill</h2>
                            <p className="text-[#5d4037] text-[10px]">Write a message to the server admin.</p>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-[#5d4037] tracking-wider">Player Name</label>
                                <input type="text" className="w-full bg-transparent border-b-2 border-[#8b5a2b] p-2 text-[#3e2723] focus:outline-none focus:border-[#3e2723] transition-colors font-serif" placeholder="Steve" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-[#5d4037] tracking-wider">Transmission</label>
                                <textarea rows="5" className="w-full bg-transparent border-b-2 border-[#8b5a2b] p-2 text-[#3e2723] focus:outline-none focus:border-[#3e2723] transition-colors font-serif resize-none" placeholder="Enter your message here..."></textarea>
                            </div>
                            <div className="flex justify-end pt-4">
                                <button className="px-6 py-3 bg-[#3e2723] text-[#f2e6c9] font-bold hover:bg-[#2d1b18] transition-colors border-2 border-[#8b5a2b] transform hover:-translate-y-1 active:translate-y-0 text-[10px] uppercase">
                                    Sign & Close
                                </button>
                            </div>
                        </form>
                    </MinecraftCard>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="text-center text-[8px] text-gray-500 py-10 opacity-60">
                <p>Build v2.0.4 | Seed: 83929312</p>
                <p className="mt-2">Crafted with React Three Fiber</p>
            </footer>

        </div>
    );
};

const ScrollControlsHtml = ({ setBgTheme, navigate }) => {
    return (
        <Scroll html style={{ width: '100vw' }}>
            <HtmlContent setBgTheme={setBgTheme} navigate={navigate} />
        </Scroll>
    )
}

const MainScene = () => {
    const [bgTheme, setBgTheme] = useState('overworld');
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen bg-[#000]">
            <Canvas shadows>
                <ScrollControls pages={6} damping={0.3}>
                    {/* 3D Content Layer */}
                    <BackgroundManager setBgTheme={setBgTheme} />
                    <BiomeParticles theme={bgTheme} />

                    {/* HTML Content Layer */}
                    <ScrollControlsHtml setBgTheme={setBgTheme} navigate={navigate} />
                </ScrollControls>
            </Canvas>
        </div>
    )
}

export default MainScene;
