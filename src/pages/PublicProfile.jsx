import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RANKS, MEDALS } from '../data/achievements';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';
import { AlertTriangle } from 'lucide-react';

const PublicProfile = () => {
    const { publicId } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // SIMULATION: Fetch user data by publicId
        // In a real app, this would be an API call
        const fetchProfile = async () => {
            await new Promise(r => setTimeout(r, 1000)); // Fake delay

            if (publicId === 'AG-88X1') {
                setProfile({
                    username: 'admin',
                    rank: RANKS.find(r => r.title === 'ARCHITECT'),
                    xp: 99999,
                    avatar: 'https://api.dicebear.com/9.x/dylan/svg?seed=admin',
                    unlockedMedals: ['medal_first_blood', 'medal_dedication', 'medal_forge_master', 'medal_red_team', 'medal_blue_team'],
                    socials: { twitter: 'https://twitter.com/admin', linkedin: 'https://linkedin.com/in/admin', website: 'https://admin.security' }
                });
            } else if (publicId === 'AG-22B9') {
                setProfile({
                    username: 'learner',
                    rank: RANKS.find(r => r.title === 'NEOPHYTE'),
                    xp: 250,
                    avatar: 'https://api.dicebear.com/9.x/dylan/svg?seed=learner',
                    unlockedMedals: ['medal_first_blood'],
                    socials: { twitter: '', linkedin: '', website: '' }
                });
            } else {
                setProfile(null);
            }
            setLoading(false);
        };

        fetchProfile();
    }, [publicId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
                <AlertTriangle className="w-12 h-12 text-red-500" />
                <h2 className="text-2xl font-orbitron font-bold text-white">OPERATIVE NOT FOUND</h2>
                <p className="text-gray-400">The requested Service ID ({publicId}) does not exist in the registry.</p>
            </div>
        );
    }

    const currentRankIndex = RANKS.findIndex(r => r.id === profile.rank.id);
    const totalMedals = MEDALS.length;
    const unlockedCount = profile.unlockedMedals.length;

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 pt-8">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-xs text-primary font-mono uppercase tracking-widest mb-2 border border-primary/20 bg-primary/5 px-2 py-1 w-fit rounded">
                        PUBLIC RECORD VIEW
                    </div>
                    <h1 className="text-4xl font-orbitron font-bold text-white tracking-wider uppercase">
                        {profile.username}
                    </h1>
                    <p className="text-gray-500 font-mono text-sm">ID: {publicId}</p>
                </div>
            </div>

            {/* Rank Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface/30 border border-white/5 rounded-2xl p-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div className="shrink-0 relative">
                        <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center bg-black/50 shadow-[0_0_50px_rgba(0,255,157,0.1)] overflow-hidden">
                            <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface border border-primary/20 rounded-full text-[10px] font-mono text-primary font-bold">
                            LEVEL {currentRankIndex}
                        </div>
                    </div>

                    <div className="flex-grow w-full space-y-4 text-center md:text-left">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
                            <div>
                                <div className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-1">Current Classification</div>
                                <h2 className="text-4xl font-orbitron font-bold text-white uppercase">{profile.rank.title}</h2>
                                <div className="flex items-center gap-4 justify-center md:justify-start mt-2">
                                    <div className="flex gap-2">
                                        {profile?.socials?.twitter && (
                                            <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                                                <Icons.Twitter size={14} />
                                            </a>
                                        )}
                                        {profile?.socials?.linkedin && (
                                            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                                                <Icons.Linkedin size={14} />
                                            </a>
                                        )}
                                        {profile?.socials?.website && (
                                            <a href={profile.socials.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                                                <Icons.Globe size={14} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-mono text-primary font-bold">{profile.xp.toLocaleString()} <span className="text-sm text-gray-500">XP</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Medals Trophy Case */}
            <div className="space-y-6">
                <h3 className="text-xl font-orbitron font-bold text-white flex items-center gap-3">
                    <Icons.Award className="text-primary" />
                    COMMENDATIONS ({unlockedCount}/{totalMedals})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MEDALS.map((medal) => {
                        const isUnlocked = profile.unlockedMedals.includes(medal.id);
                        const MedalIcon = Icons[medal.icon];

                        return (
                            <div
                                key={medal.id}
                                className={cn(
                                    "relative p-6 rounded-xl border transition-all duration-300",
                                    isUnlocked
                                        ? "bg-surface/40 border-primary/30 shadow-[0_0_30px_-10px_rgba(0,255,157,0.2)]"
                                        : "bg-surface/10 border-white/5 opacity-60 grayscale"
                                )}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={cn(
                                        "p-3 rounded-lg border",
                                        isUnlocked ? "bg-primary/20 border-primary/30 text-primary" : "bg-white/5 border-white/5 text-gray-500"
                                    )}>
                                        <MedalIcon size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className={cn("font-bold font-rajdhani uppercase tracking-wide", isUnlocked ? "text-white" : "text-gray-500")}>
                                            {medal.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            {medal.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
