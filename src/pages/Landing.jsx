import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Menu, Shield, Lock, ExternalLink, BookOpen, Clock, Edit3, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const HackerLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);

    // Hacker-style boot logs
    const bootLogs = [
        "Initializing handshake protocol...",
        "Bypassing perimeter firewalls...",
        " rerouting connection via node [127.8.4.2]...",
        "Accessing shadow gateway...",
        "Decrypting payload...",
        " verifying key signature...",
        "CONNECTION ESTABLISHED.",
        " welcome to the operators network."
    ];

    useEffect(() => {
        // Log generation
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < bootLogs.length) {
                setLogs(prev => [...prev, bootLogs[logIndex]]);
                logIndex++;
            }
        }, 600);

        // Progress bar
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 5;
            });
        }, 150);

        // Completion
        const timeout = setTimeout(() => {
            onComplete();
        }, 6000);

        return () => {
            clearInterval(logInterval);
            clearInterval(progressInterval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center text-gray-800 font-sans p-8">
            <div className="w-full max-w-2xl">
                {/* Connection Window */}
                <div className="border-2 border-gray-300 bg-white p-8 rounded-lg shadow-xl">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <h2 className="text-xl font-semibold text-gray-900">Establishing Connection</h2>
                    </div>

                    {/* Logs */}
                    <div className="h-48 overflow-y-auto mb-6 space-y-2">
                        {logs.map((log, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="text-gray-700 text-sm">{log}</div>
                            </div>
                        ))}
                        {logs.length < bootLogs.length && (
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                                <div className="text-gray-400 text-sm animate-pulse">Processing...</div>
                            </div>
                        )}
                    </div>

                    {/* Progress */}
                    <div className="w-full h-3 bg-gray-200 rounded-full mb-3 overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300 rounded-full"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Connecting to NYTVNT Network</span>
                        <span className="font-semibold">{Math.floor(progress)}%</span>
                    </div>
                </div>

                {/* Success Message */}
                {progress > 95 && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center mt-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-6 py-3 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-700 font-semibold">Connection Established</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// Testimonials Data - Hacker Forum Style
const TESTIMONIALS = [
    {
        username: "ajay_dev",
        role: "App Developer",
        timestamp: "2 weeks ago",
        reputation: "★★★★☆",
        quote: "Attack Mode path is no joke. Went from pushing broken code to actually understanding how my apps get exploited. Now I patch before deploy.",
    },
    {
        username: "shirdi_v",
        role: "Python Developer",
        timestamp: "1 month ago",
        reputation: "★★★★★",
        quote: "Builder path automation modules hit different. IaC finally clicked. My pipelines are locked down and I sleep better.",
    },
    {
        username: "brijith_sec",
        role: "AppSec Engineer",
        timestamp: "3 weeks ago",
        reputation: "★★★★★",
        quote: "Convergence path bridged the gap I didn't know existed. Purple teaming makes sense now. Red and blue aren't enemies anymore.",
    },
    {
        username: "g_gautham",
        role: "DevOps Admin",
        timestamp: "1 week ago",
        reputation: "★★★★☆",
        quote: "K8s security modules saved my job. Production hasn't been breached since. Worth every hour.",
    },
    {
        username: "joyal_data",
        role: "Data Analyst",
        timestamp: "2 months ago",
        reputation: "★★★★★",
        quote: "Sentinel taught me OSINT isn't just googling. Real methodology. Real results. Opened doors I didn't know existed.",
    },
];

const STATS = [
    { value: '7', label: 'Operational Paths', suffix: '' },
    { value: '292', label: 'Combat Modules', suffix: '' },
    { value: '∞', label: 'Skill Ceiling', suffix: '' },
];

const Landing = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [currentDate, setCurrentDate] = useState('');
    const [isEntering, setIsEntering] = useState(false);

    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }));

        // When landing on the public wiki, clear the active dashboard session
        // This forces a re-authentication check if the user tries to go back to the dashboard
        sessionStorage.removeItem('active_session');
    }, []);

    // Navigation handler
    const handleEntry = () => {
        setIsEntering(true);
    };

    const handleHackerLoadComplete = () => {
        navigate('/login');
    };

    if (isEntering) {
        return <HackerLoader onComplete={handleHackerLoadComplete} />;
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#c8e2f2]">
            {/* Wikipedia-style Header */}
            <header className="border-b border-[#a7d7f9] bg-white h-16 flex items-center px-4 sticky top-0 z-50">
                <div className="flex items-center gap-4 w-full max-w-[1600px] mx-auto">
                    {/* Logo Area */}
                    <div className="flex items-center gap-2 mr-6">
                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-serif font-bold text-xl">
                            W
                        </div>
                        <div className="hidden md:block leading-tight">
                            <div className="font-serif text-lg">The Wiki</div>
                            <div className="text-[10px] text-gray-500 font-sans">The Free Encyclopedia</div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search The Wiki"
                                className="w-full px-4 py-2 border border-[#a2a9b1] rounded-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                            <button className="bg-[#36c] text-white px-4 py-2 border border-[#36c] font-bold text-sm">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* User Tools - MODIFIED */}
                    <div className="ml-auto text-xs flex items-center gap-4 text-[#36c]">
                        {/* Removed Create account */}
                        <span className="hidden sm:inline text-black cursor-default">Not logged in</span>
                        <span onClick={handleEntry} className="hidden sm:inline hover:underline cursor-pointer font-bold">Log in</span>
                        <button className="sm:hidden">
                            <Menu size={20} className="text-black" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="max-w-[1600px] mx-auto flex">
                {/* Sidebar */}
                <aside className="w-44 hidden md:block pt-6 px-4 text-xs bg-[#f6f6f6] min-h-screen border-r border-[#a2a9b1]">
                    <div className="mb-6">
                        <div className="text-center mb-4">
                            <div className="w-24 h-24 mx-auto bg-[#e1e1e1] rounded-full flex items-center justify-center text-gray-400 mb-2">
                                <Globe size={48} />
                            </div>
                        </div>
                        <ul className="space-y-2 text-[#0645ad]">
                            <li className="hover:underline cursor-pointer">Main page</li>
                            <li className="hover:underline cursor-pointer">Contents</li>
                            <li className="hover:underline cursor-pointer">Current events</li>
                            <li className="hover:underline cursor-pointer">Random article</li>
                            <li className="hover:underline cursor-pointer">About The Wiki</li>
                            <li className="hover:underline cursor-pointer">Contact us</li>
                            <li className="hover:underline cursor-pointer">Donate</li>
                        </ul>
                    </div>
                </aside>

                {/* Article Content */}
                <main className="flex-1 px-4 md:px-8 py-6 bg-white max-w-5xl">
                    {/* Article Header */}
                    <div className="border-b border-[#a2a9b1] mb-6 pb-2">
                        <div className="flex items-baseline justify-between">
                            <h1 className="text-3xl font-serif border-b-0 mb-0 font-normal py-1">NYTVNT (Network)</h1>
                            <div className="text-xs text-[#72777d] flex gap-2">
                                <span>Article</span>
                                <span>Talk</span>
                            </div>
                        </div>
                        <div className="text-sm text-[#54595d] mt-1">
                            From The Wiki, the free encyclopedia
                        </div>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-6">
                        {/* Text Content */}
                        <div className="flex-1 text-[#202122] leading-7 text-[15px] font-sans">
                            {/* Infobox for Mobile */}
                            <div className="md:hidden border border-[#a2a9b1] bg-[#f8f9fa] p-4 mb-4 text-xs">
                                <div className="bg-[#b0c4de] text-center font-bold py-1 mb-2">NYTVNT</div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="font-bold">Founded</div>
                                    <div>2024 (approx.)</div>
                                    <div className="font-bold">Type</div>
                                    <div>Underground Network</div>
                                    <div className="font-bold">Status</div>
                                    <div>Active / Classified</div>
                                </div>
                            </div>

                            <p className="mb-4">
                                <b>NYTVNT</b> (pronounced <i>/nɛt-vɛnt/</i>) is a decentralized collective and operational framework associated with <a href="#" className="text-[#0645ad] hover:underline">cybersecurity research</a>, <a href="#" className="text-[#0645ad] hover:underline">offensive operations</a>, and digital defense mechanisms. Unlike traditional hacktivist groups, NYTVNT operates on a philosophy of "constructive exploitation," encouraging members to break systems solely for the purpose of engineering superior defenses.
                            </p>

                            <p className="mb-4">
                                The group emerged following a series of high-profile data breaches in the mid-2020s, which exposed the vulnerabilities of critical global infrastructure. It is rumored to be a recruitment ground for elite <a href="#" className="text-[#0645ad] hover:underline">security operators</a> seeking to bypass standard corporate red-tape.
                            </p>

                            {/* TOC */}
                            <div className="bg-[#f8f9fa] border border-[#a2a9b1] inline-block px-4 py-3 my-4 rounded-sm">
                                <div className="font-bold text-center mb-2 text-sm">Contents</div>
                                <ol className="list-decimal list-inside text-[#0645ad] text-sm space-y-1">
                                    <li className="hover:underline cursor-pointer">History and Origins</li>
                                    <li className="hover:underline cursor-pointer">Philosophy</li>
                                    <li className="hover:underline cursor-pointer">
                                        <span onClick={() => document.getElementById('recruitment').scrollIntoView()} className="cursor-pointer">
                                            Recruitment and "The Call"
                                        </span>
                                    </li>
                                    <li className="hover:underline cursor-pointer">Controversies</li>
                                    <li className="hover:underline cursor-pointer">References</li>
                                </ol>
                            </div>

                            <h2 className="text-2xl font-serif border-b border-[#a2a9b1] mt-8 mb-4 py-1">History and Origins</h2>
                            <p className="mb-4">
                                The exact origins of NYTVNT are obscured by digital misinformation and contradictory reports. Early mentions of the acronym appeared in encrypted logs recovered from the <i>Project Zero</i> incident. Analysts suggest it began as a reaction to "The Great Silence"—a period where major corporations suppressed vulnerability disclosures.
                            </p>
                            <p className="mb-4">
                                A faction of developers, disgruntled by the lack of transparency, began sharing <a href="#" className="text-[#0645ad] hover:underline">zero-day exploits</a> amongst themselves, not to sell, but to patch. This formed the "Breaking Guild."
                            </p>

                            <h2 className="text-2xl font-serif border-b border-[#a2a9b1] mt-8 mb-4 py-1">Philosophy</h2>
                            <div className="bg-[#f9f9f9] border-l-4 border-[#a2a9b1] p-4 my-4 italic text-gray-600">
                                "To understand the shield, one must first master the sword. We do not learn to destroy; we destroy to understand what cannot be broken."
                            </div>
                            <p className="mb-4">
                                The central tenet of the group is that theoretical security is a fallacy. Real security comes only from the practical application of offensive techniques. They categorize their operations into distinct paths: <b>Combat</b> (Attack), <b>Defense</b> (Protect), and <b>Convergence</b> (Engineering).
                            </p>

                            <h2 id="recruitment" className="text-2xl font-serif border-b border-[#a2a9b1] mt-8 mb-4 py-1">Recruitment and "The Call"</h2>
                            <p className="mb-4">
                                NYTVNT does not advertise publicly. Prospective members often find themselves redirected to the network through hidden protocols in compromised servers or embedded steganography in public forums.
                            </p>
                            <p className="mb-4">
                                Access to the operational dashboard is restricted. However, it is an open secret that the <b onClick={handleEntry} className="text-[#0645ad] hover:underline cursor-pointer hover:bg-blue-50 transition-colors">The Call of Hackers</b> (often just referred to as "Enter Mission") serves as the primary gateway for those who know where to look.
                            </p>
                            <p className="mb-4 text-sm text-gray-600">
                                <sup>[citation needed]</sup> <i>Some sources claim the login portal is disguised as a standard Wikipedia entry point until accessed by specific signatures.</i>
                            </p>

                            <h2 className="text-2xl font-serif border-b border-[#a2a9b1] mt-8 mb-4 py-1">See Also</h2>
                            <ul className="list-disc list-inside text-[#0645ad] mb-8 space-y-1">
                                <li className="hover:underline cursor-pointer">List of hacker groups</li>
                                <li className="hover:underline cursor-pointer">Cyberwarfare</li>
                                <li className="hover:underline cursor-pointer">Penetration testing</li>
                            </ul>

                            <div className="text-xs text-[#54595d] border-t border-[#a2a9b1] pt-4 mt-12">
                                <p>This page was last edited on {currentDate}, at 23:42 (UTC).</p>
                                <p className="mt-2">Text is available under the Creative Commons Attribution-ShareAlike License; additional terms may apply.</p>
                            </div>
                        </div>

                        {/* Desktop Infobox */}
                        <div className="w-72 hidden md:block shrink-0">
                            <div className="border border-[#a2a9b1] bg-[#f8f9fa] p-1 text-sm">
                                <div className="bg-[#b0c4de] text-center font-bold py-1 mb-2">NYTVNT</div>
                                <div className="relative mb-4">
                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center border border-[#a2a9b1]">
                                        <Globe size={64} className="text-gray-400" />
                                    </div>
                                    <div className="text-[10px] mt-1 text-center leading-tight">
                                        The decentralized seal often associated with node operators.
                                    </div>
                                </div>

                                <table className="w-full text-left text-xs">
                                    <tbody>
                                        <tr className="border-t border-[#a2a9b1]">
                                            <th className="py-1 pr-2 align-top">Founded</th>
                                            <td className="py-1">2024; 2 years ago</td>
                                        </tr>
                                        <tr className="border-t border-[#a2a9b1]">
                                            <th className="py-1 pr-2 align-top">Motto</th>
                                            <td className="py-1 italic">"Break Systems. Build Defenses."</td>
                                        </tr>
                                        <tr className="border-t border-[#a2a9b1]">
                                            <th className="py-1 pr-2 align-top">Focus</th>
                                            <td className="py-1">
                                                <div className="space-y-1">
                                                    <div>• Offensive Security</div>
                                                    <div>• Infrastructure Hardening</div>
                                                    <div>• Cryptography</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-t border-[#a2a9b1]">
                                            <th className="py-1 pr-2 align-top">Membership</th>
                                            <td className="py-1">Unknown (Classified)</td>
                                        </tr>
                                        <tr className="border-t border-[#a2a9b1]">
                                            <th className="py-1 pr-2 align-top">Website</th>
                                            <td className="py-1">
                                                <span
                                                    onClick={handleEntry}
                                                    className="text-[#0645ad] hover:underline cursor-pointer"
                                                >
                                                    nytvnt.dev/ops
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
