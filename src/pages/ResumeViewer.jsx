import { Link } from 'react-router-dom';

const ResumeViewer = () => {
    return (
        <div className="w-full h-screen bg-[#0a0a0a] flex flex-col font-['Press_Start_2P']">
            {/* Header */}
            <div className="w-full p-6 flex justify-between items-center bg-black/50 border-b border-white/10">
                <Link to="/" className="px-6 py-2 bg-white/5 border border-white/20 rounded text-white text-[10px] hover:bg-white/10 transition-all">
                    ← BACK TO BASE
                </Link>
                <h1 className="text-white text-[12px] hidden md:block tracking-widest uppercase">
                    Accessing Data: Resume_Harsh_khatri.pdf
                </h1>
                <a
                    href={`${import.meta.env.BASE_URL}Resume_Harsh_khatri_03.pdf`}
                    download
                    className="px-6 py-2 bg-green-600/20 border border-green-500/50 rounded text-green-400 text-[10px] hover:bg-green-600/40 transition-all"
                >
                    DOWNLOAD
                </a>
            </div>

            {/* Resume Content */}
            <div className="flex-1 w-full bg-[#1a1a1a] shadow-inner relative overflow-hidden">
                <iframe
                    src={`${import.meta.env.BASE_URL}Resume_Harsh_khatri_03.pdf`}
                    className="w-full h-full border-none"
                    title="Resume"
                />

            </div>

            
        </div>
    );
};

export default ResumeViewer;
