import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Menu, Shield, Lock, ExternalLink, BookOpen, Clock, Edit3, MessageSquare, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';


const SimpleLoader = () => (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
);

const Landing = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();
    const [currentDate, setCurrentDate] = useState('');
    const [isEntering, setIsEntering] = useState(false);

    useEffect(() => {
        // Reset entry state on mount to fix "stuck" loader on back navigation
        setIsEntering(false);

        if (!isLoading) {
            if (isAuthenticated) {
                navigate('/dashboard');
            } else {
                setCurrentDate('February 7, 2026');
                sessionStorage.removeItem('active_session');
            }
        }
    }, [isAuthenticated, isLoading, navigate]);

    // Idle Timer Logic
    const [lastInteraction, setLastInteraction] = useState(Date.now());

    useEffect(() => {
        const events = ['mousemove', 'scroll', 'keydown', 'click', 'touchstart'];

        const resetTimer = () => {
            setLastInteraction(Date.now());
        };

        events.forEach(event => window.addEventListener(event, resetTimer));

        const intervalId = setInterval(() => {
            const hasAutoRedirected = sessionStorage.getItem('has_visited_login');

            // Only auto-redirect if we haven't visited login yet in this session
            if (!hasAutoRedirected && Date.now() - lastInteraction > 5000 && !isEntering) {
                handleEntry();
            }
        }, 1000);

        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimer));
            clearInterval(intervalId);
        };
    }, [lastInteraction, isEntering]);

    const handleEntry = () => {
        // Mark that we are entering/have entered, so auto-redirect doesn't fire again if we come back
        sessionStorage.setItem('has_visited_login', 'true');

        setIsEntering(true);
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 6000); // Increased to 6 seconds for effect
    };

    // Move SimpleLoader to be an overlay instead of replacing content
    // This prevents unmounting/remounting issues on back navigation
    return (
        <div className="min-h-screen bg-white text-[#202122] font-serif selection:bg-blue-200 selection:text-blue-900">
            {isEntering && <SimpleLoader />}
            {/* Wikipedia-style Header */}
            <header className="border-b border-[#a7d7f9] bg-white h-16 flex items-center px-4 sticky top-0 z-50 font-sans">
                <div className="flex items-center gap-4 w-full max-w-[1600px] mx-auto">
                    <div className="flex items-center gap-2 mr-6 shrink-0 font-serif">
                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-serif font-bold text-xl">
                            W
                        </div>
                        <div className="hidden sm:block leading-tight">
                            <div className="font-serif text-lg">The Wiki</div>
                            <div className="text-[10px] text-gray-400 font-sans uppercase tracking-tighter">The Free Operational Encyclopedia</div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl hidden md:block">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search Protocols..."
                                className="w-full px-4 py-2 border border-[#a2a9b1] rounded-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-sans"
                            />
                            <button className="bg-[#36c] text-white px-4 py-2 border border-[#36c] font-bold text-sm hover:bg-[#447ff5] font-sans">
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="ml-auto text-xs flex items-center gap-4 text-[#36c] shrink-0 font-sans">
                        <span className="hidden lg:inline text-black cursor-default">Status: <span className="text-green-600 font-mono animate-pulse">CLASSIFIED</span></span>
                        <span onClick={handleEntry} className="hover:underline cursor-pointer font-bold bg-[#36c]/5 px-3 py-1.5 rounded-sm">Enter Mission</span>
                        <button className="md:hidden">
                            <Menu size={20} className="text-black" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="max-w-[1600px] mx-auto flex">
                {/* Sidebar */}
                <aside className="w-44 hidden md:block pt-6 px-4 text-xs bg-[#f6f6f6] min-h-screen border-r border-[#a2a9b1] shrink-0 font-sans">
                    <div className="mb-6">
                        <div className="text-center mb-4">
                            <div className="w-24 h-24 mx-auto bg-[#e1e1e1] rounded-full flex items-center justify-center text-gray-400 mb-2 border border-[#a2a9b1]">
                                <Globe size={48} className="opacity-40" />
                            </div>
                        </div>
                        <ul className="space-y-3 text-[#0645ad]">
                            <li className="font-bold text-black uppercase tracking-tighter mb-1">Navigation</li>
                            <li>Main page</li>
                            <li>Operational Paths</li>
                            <li>Deep Web Feed</li>
                            <li>Shadow Ops</li>
                            <hr className="border-[#a2a9b1]" />
                            <li className="font-bold text-black uppercase tracking-tighter mb-1">Project Info</li>
                            <li>About NYTVNT</li>
                            <li>Ethics Protocol</li>
                            <li className="text-red-700">Donate Crypto</li>
                        </ul>
                    </div>
                </aside>

                {/* Article Content */}
                <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 bg-white max-w-5xl">
                    {/* Article Header */}
                    <div className="border-b border-[#a2a9b1] mb-6 pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                            <h1 className="text-4xl font-serif mb-0 font-normal">NYTVNT: The Operative Records</h1>
                            <div className="text-xs text-[#72777d] flex gap-2 font-sans py-1">
                                <span className="cursor-pointer font-bold border-b-2 border-orange-500">Article</span>
                                <span className="cursor-pointer">Talk</span>
                                <span className="cursor-pointer">Read</span>
                                <span className="cursor-pointer">View History</span>
                            </div>
                        </div>
                        <div className="text-[13px] text-[#54595d] mt-1 italic">
                            From The Wiki, the encyclopedia of technical warfare and shadow architectures
                        </div>
                    </div>

                    <div className="flex flex-col-reverse lg:flex-row gap-8">
                        {/* Text Content */}
                        <div className="flex-1 leading-8 text-[17px] text-justify">
                            {/* Infobox for Mobile */}
                            <div className="lg:hidden border border-[#a2a9b1] bg-[#f8f9fa] p-4 mb-6 text-xs shadow-sm font-sans">
                                <div className="bg-[#b0c4de] text-center font-bold py-1.5 mb-2 border border-[#a2a9b1]">OPERATIVE LOG [2024]</div>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                                    <div className="font-bold border-r border-[#a2a9b1] pr-2 text-right uppercase tracking-tighter">Deployed</div>
                                    <div>0x7E8 (Feb 2024)</div>
                                    <div className="font-bold border-r border-[#a2a9b1] pr-2 text-right uppercase tracking-tighter">Focus</div>
                                    <div>Shadow Systems</div>
                                    <div className="font-bold border-r border-[#a2a9b1] pr-2 text-right uppercase tracking-tighter">Status</div>
                                    <div>Active / Hostile</div>
                                    <div className="font-bold border-r border-[#a2a9b1] pr-2 text-right uppercase tracking-tighter">Motto</div>
                                    <td className="italic text-[10px]">Verify, then Nullify.</td>
                                </div>
                            </div>

                            <p className="mb-6">
                                The emergence of <b>NYTVNT</b> (Network Venting Protocols) in late <b>2024</b> marked a paradigm shift in how technical proficiency is cultivated within the underground. Far from a repository for passive reading, the collective operates as a fragmented intelligence engine, distributing its knowledge across seven distinct operative disciplines.
                            </p>

                            {/* TOC */}
                            <div className="bg-[#f8f9fa] border border-[#a2a9b1] inline-block px-6 py-4 my-8 rounded-sm w-full sm:w-auto font-sans">
                                <div className="font-bold text-center mb-3 text-sm">Contents</div>
                                <ol className="list-decimal list-inside text-[#0645ad] text-[14px] space-y-1.5">
                                    <li>Origins and Evolution</li>
                                    <li>Disciplines of the Operator</li>
                                    <li>The Shadow Economy</li>
                                    <li>The Terminal Gateway</li>
                                </ol>
                            </div>

                            <h2 className="text-2xl border-b border-[#a2a9b1] mt-12 mb-6 py-1">Origins and Evolution</h2>
                            <p className="mb-6">
                                Documentary evidence suggests the project's inception was a reaction to the increasing "sanitization" of security training. NYTVNT serves those who find the standard curriculum insufficient. It is less of a school and more of a <i>proving ground</i>, where the only grade that matters is the successful execution of an operation.
                            </p>

                            <h2 className="text-2xl border-b border-[#a2a9b1] mt-12 mb-6 py-1">Disciplines of the Operator</h2>
                            <p className="mb-6">
                                The path of an operative is rarely linear. Experience gained through the <b>Forge</b>—a rigorous hardening of one's own environment—acts as the foundational requirement. Once the node is secure, the operative may branch into the more aggressive methodologies.
                            </p>
                            <p className="mb-6 italic text-gray-700 bg-gray-50 p-6 border-l-4 border-blue-200 leading-relaxed shadow-sm">
                                Legends speak of those who master the <b>Sentinel</b> protocols, transforming themselves into "ghosts" within the Dark Web, collecting whispers of breaches before they even manifest. Others, driven by a destructive curiosity, descend into <b>Exploit</b>, where the goal is not just to break, but to understand the very soul of the vulnerability.
                            </p>
                            <p className="mb-6">
                                For those who seek the preservation of digital order, the <b>Protector</b> and <b>Builder</b> disciplines offer a constructive counterpart. It is said that an <b>Architect</b> does not merely build a wall; they weave a tapestry of decoys, traps, and immutable logic that makes attack not just difficult, but mathematically unprofitable.
                            </p>

                            <h2 className="text-2xl border-b border-[#a2a9b1] mt-12 mb-6 py-1">The Shadow Economy</h2>
                            <p className="mb-6">
                                Within the internal network, status is not granted; it is purchased through labor. The <b>Coin</b> system serves as a decentralized ledger of reputation. Successful data exfiltration, vulnerability patching, or intelligence reporting credits the operative's wallet. These credits are the only key to the higher-tier paths, where the modules transition from theory to "live-fire" simulations.
                            </p>

                            <div className="bg-[#f0f2f5] border-l-4 border-[#36c] p-8 my-10 italic text-slate-900 shadow-sm leading-8">
                                "The coin is the heartbeat of the collective. If you stop producing value, your node goes silent. We do not tolerate static."
                                <span className="block text-[11px] mt-4 font-bold not-italic font-sans tracking-[0.2em] uppercase opacity-50">— Decrypted Header from [node-e02]</span>
                            </div>

                            <h2 className="text-2xl border-b border-[#a2a9b1] mt-12 mb-6 py-1 text-red-900">The Terminal Gateway</h2>
                            <p className="mb-8">
                                To transition from a reader to an operative, one must find the breach. The <b>Terminal Gateway</b> remains the only validated entry point. It requires an active handshake with the central auth-node. It is at this point that a <span className="text-blue-700 font-bold">Future Warrior</span> either collapses under the weight of the challenges or begins their <span className="text-blue-700 font-bold underline decoration-dotted underline-offset-4">Ascension</span> to the rank of <b>Hacker Elite</b>.
                            </p>

                            <div className="flex justify-center my-16">
                                <button
                                    onClick={handleEntry}
                                    className="px-10 py-4 bg-[#36c] text-white font-serif text-xl hover:bg-blue-700 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.2)] group active:translate-y-1 active:shadow-none"
                                >
                                    Initiate Handshake <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </button>
                            </div>

                            <div className="text-[11px] text-[#54595d] border-t border-[#a2a9b1] pt-6 mt-20 leading-relaxed font-sans">
                                <p>Sychronized: {currentDate} | Node: NYTVNT-MAIN-01</p>
                                <p className="mt-2 uppercase tracking-[0.05em] opacity-80">Warning: This document contains memetic agents designed to discourage unauthorized researchers. If you experience dizziness, please disconnect immediately. </p>
                            </div>
                        </div>

                        {/* Desktop Infobox */}
                        <div className="w-full lg:w-80 shrink-0 hidden lg:block font-sans">
                            <div className="border border-[#a2a9b1] bg-[#f8f9fa] p-1 text-sm shadow-sm sticky top-24">
                                <div className="bg-[#b0c4de] text-center font-bold py-1.5 mb-3 border border-[#a2a9b1] font-serif tracking-widest uppercase">OPERATIVE DOSSIER</div>
                                <div className="px-2 mb-4">
                                    <div className="w-full h-44 bg-gray-200 flex items-center justify-center border border-[#a2a9b1] relative overflow-hidden group">
                                        <Globe size={80} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent shadow-inner"></div>
                                    </div>
                                    <div className="text-[10px] mt-2 text-center leading-tight text-gray-500 italic font-serif px-2">
                                        "Visibility is a privilege, and we are revoked."
                                    </div>
                                </div>

                                <table className="w-full text-left text-[12px] border-collapse font-serif font-medium">
                                    <tbody>
                                        <tr className="border-t border-[#a2a9b1]">
                                            <th className="py-2 px-3 bg-[#f2f2f2] w-24 uppercase text-[10px] font-sans tracking-tighter">Deployment</th>
                                            <td className="py-2 px-3">February 2024</td>
                                        </tr>
                                        <tr className="border-t border-[#a2a9b1]">
                                            <th className="py-2 px-3 bg-[#f2f2f2] uppercase text-[10px] font-sans tracking-tighter">Origin</th>
                                            <td className="py-2 px-3 italic">Null-Collective</td>
                                        </tr>
                                        <tr className="border-t border-[#a2a9b1]">
                                            <th className="py-2 px-3 bg-[#f2f2f2] uppercase text-[10px] font-sans tracking-tighter">Reputation</th>
                                            <td className="py-2 px-3 font-mono text-blue-600">8.2M XP (Active)</td>
                                        </tr>
                                        <tr className="border-t border-[#a2a9b1]">
                                            <th className="py-2 px-3 bg-[#f2f2f2] uppercase text-[10px] font-sans tracking-tighter">Directives</th>
                                            <td className="py-2 px-3">
                                                <div className="space-y-1 text-[11px] font-sans font-normal">
                                                    <div className="flex items-center gap-1">■ Defense-Harden</div>
                                                    <div className="flex items-center gap-1">■ Offensive-Pry</div>
                                                    <div className="flex items-center gap-1">■ Intel-Harvest</div>
                                                    <div className="flex items-center gap-1">■ Crypto-Ops</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-t border-[#a2a9b1]">
                                            <th className="py-2 px-3 bg-[#f2f2f2] uppercase text-[10px] font-sans tracking-tighter">Gateway</th>
                                            <td className="py-2 px-3">
                                                <span
                                                    onClick={handleEntry}
                                                    className="text-[#0645ad] hover:underline cursor-pointer font-bold font-sans"
                                                >
                                                    nytvnt://pro.dev
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Landing;
