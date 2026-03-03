import React, { useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

const SkillInventory = ({ skills }) => {
    // Default to the first skill for the details panel
    const [hoveredSkill, setHoveredSkill] = useState(skills[0]);

    // Metadata generator for "Pro" feel without numbers
    const getSkillMeta = (name) => {
        if (name.includes('Java')) return { tier: 'Legendary', type: 'Core Engine', enchant: 'Efficiency V' };
        if (name.includes('SQL')) return { tier: 'Epic', type: 'Data Storage', enchant: 'Fortune III' };
        if (name.includes('Security')) return { tier: 'Epic', type: 'Guardian', enchant: 'Protection IV' };
        return { tier: 'Rare', type: 'Technical Tool', enchant: 'Unbreaking III' };
    };

    return (
        <div className="bg-[#1e1e1e] p-1 border-t-4 border-l-4 border-[#3c3c3c] border-b-4 border-r-4 border-black shadow-[15px_15px_0_rgba(0,0,0,0.6)] w-full">
            <div className="bg-[#2d2d2d] p-4 md:p-6 border-t-4 border-l-4 border-[#4a4a4a] border-b-4 border-r-4 border-[#1a1a1a]">

                {/* GUI Header */}
                <div className="mb-6 flex justify-between items-center border-b-2 border-white/5 pb-4">
                    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Storage // Skills.bin</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-purple-900 rounded-full" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* LEFT PANE: Selected Item Specs (Industry Standard Side-by-Side) */}
                    <div className="md:col-span-5 bg-[#1a1a1a] border-t-2 border-l-2 border-[#111] border-b-2 border-r-2 border-[#333] p-4 min-h-[200px] flex flex-col justify-center relative overflow-hidden group">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={hoveredSkill.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="relative z-10"
                            >
                                <div className="text-4xl mb-4 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">{hoveredSkill.icon}</div>
                                <h3 className="text-[#55FFFF] font-bold text-sm md:text-md uppercase tracking-wide mb-2">
                                    {hoveredSkill.name}
                                </h3>

                                <div className="space-y-3 pt-4 border-t border-white/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[7px] text-gray-500 uppercase font-bold">Rarity</span>
                                        <span className={classNames(
                                            "text-[8px] font-bold px-2 py-0.5 rounded-sm",
                                            getSkillMeta(hoveredSkill.name).tier === 'Legendary' ? "bg-orange-600/20 text-orange-400" :
                                                getSkillMeta(hoveredSkill.name).tier === 'Epic' ? "bg-purple-600/20 text-purple-400" : "bg-blue-600/20 text-blue-400"
                                        )}>
                                            {getSkillMeta(hoveredSkill.name).tier}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[7px] text-gray-500 uppercase font-bold">Type</span>
                                        <span className="text-[8px] text-gray-300 font-mono uppercase">{getSkillMeta(hoveredSkill.name).type}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[7px] text-gray-500 uppercase font-bold">Active Enchant</span>
                                        <span className="text-[8px] text-purple-400 italic">{getSkillMeta(hoveredSkill.name).enchant}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Visual background noise */}
                        <div className="absolute top-0 right-0 p-2 opacity-10 font-mono text-[8px] text-white">0x{Math.random().toString(16).slice(2, 6).toUpperCase()}</div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                    </div>

                    {/* RIGHT PANE: The Inventory Grid */}
                    <div className="md:col-span-7 bg-[#1a1a1a] border-t-2 border-l-2 border-[#111] border-b-2 border-r-2 border-[#333] p-3 grid grid-cols-3 sm:grid-cols-3 gap-2 shadow-inner">
                        {skills.map((s, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredSkill(s)}
                                className={classNames(
                                    "aspect-square flex items-center justify-center cursor-pointer transition-all border-2 relative group",
                                    hoveredSkill.name === s.name
                                        ? "bg-purple-900/30 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                        : "bg-[#252525] border-[#333] hover:border-gray-500"
                                )}
                            >
                                <span className="text-2xl group-hover:scale-110 transition-transform filter drop-shadow-[2px_2px_0_#000]">{s.icon}</span>

                                {/* Item Corners */}
                                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/5" />
                                <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-black/40" />

                                {/* Enchanted Glint (Only on active/hover) */}
                                {hoveredSkill.name === s.name && (
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent animate-pulse pointer-events-none" />
                                )}
                            </div>
                        ))}

                        {/* Fill the grid to 9 slots (standard small bag) */}
                        {Array.from({ length: Math.max(0, 9 - skills.length) }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square bg-[#1a1a1a] border-2 border-dashed border-[#333] opacity-20" />
                        ))}
                    </div>
                </div>

                {/* Footer Status Box */}
                <div className="mt-8 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 bg-green-500 shadow-[0_0_5px_#22c55e]" />
                        <span className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">Backend_Node_Initialized</span>
                    </div>
                    <div className="text-[7px] text-gray-400 font-sans italic opacity-60">"The right tools for the right job." — Dev</div>
                </div>
            </div>
        </div>
    );
};

export default SkillInventory;
