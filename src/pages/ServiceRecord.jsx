import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { RANKS, MEDALS } from '../data/achievements';
import * as Icons from 'lucide-react';
import { Share2, Edit, Copy, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';

const ServiceRecord = () => {
    const { xp, currentRank, unlockedMedals, progress } = useProgress();
    const { user, updateUserProfile } = useAuth();

    // Helper for avatar with fallback
    const getAvatarUrl = () => {
        if (user?.avatar && user.avatar.trim() !== '') {
            return user.avatar;
        }
        // Fallback to DiceBear with username or email
        const seed = user?.username || user?.email || 'default';
        return `https://api.dicebear.com/9.x/dylan/svg?seed=${seed}`;
    };

    // Edit Profile State
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        username: user?.username || '',
        avatar: user?.avatar || '',
        socials: {
            twitter: user?.socials?.twitter || '',
            linkedin: user?.socials?.linkedin || '',
            website: user?.socials?.website || ''
        }
    });
    const [isSaving, setIsSaving] = useState(false);

    // Share State
    const [copied, setCopied] = useState(false);
    const publicUrl = `${window.location.origin}/u/${user?.publicId}`;

    // Calculate progress to next rank
    const currentRankIndex = RANKS.findIndex(r => r.id === currentRank.id);
    const nextRank = RANKS[currentRankIndex + 1];

    let progressPercent = 100;
    if (nextRank) {
        const xpInLevel = xp - currentRank.minXp;
        const xpNeeded = nextRank.minXp - currentRank.minXp;
        progressPercent = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
    }

    // Stats
    const totalModulesCompleted = Object.values(progress).flat().length;
    const totalMedals = MEDALS.length;
    const unlockedCount = unlockedMedals.length;

    const handleCopy = () => {
        navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            await updateUserProfile(user.id, {
                username: editForm.username,
                avatar: editForm.avatar,
                socials: editForm.socials
            });
            setIsEditing(false);
        } catch (error) {
            alert(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 relative">
            {/* Header & Share */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <h1 className="text-4xl font-orbitron font-bold text-white tracking-wider">SERVICE RECORD</h1>
                    <p className="text-gray-400 font-mono text-sm max-w-2xl">
                        Your permanent record of operational excellence. Ranks are earned through XP.
                    </p>
                </div>

                {/* Public Link Card */}
                <div className="bg-surface/50 border border-white/10 p-4 rounded-xl flex flex-col gap-2 w-full md:w-auto">
                    <div className="text-[10px] uppercase font-mono text-gray-400 flex items-center gap-2">
                        <Share2 size={12} /> Public Profile Link
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg border border-white/5">
                        <code className="text-xs text-primary font-mono truncate max-w-[200px]">{publicUrl}</code>
                        <button
                            onClick={handleCopy}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                            title="Copy Link"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Rank Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface/30 border border-white/5 rounded-xl p-8 relative overflow-hidden group"
            >
                {/* Edit Button */}
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors z-20 flex items-center gap-2"
                >
                    <Edit size={16} /> <span className="text-xs font-mono">EDIT PROFILE</span>
                </button>

                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    {/* User Avatar with Rank Icon Overlay */}
                    <div className="shrink-0 relative">
                        <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center bg-black/50 shadow-[0_0_50px_rgba(0,255,157,0.1)] overflow-hidden relative group/avatar">
                            <img src={getAvatarUrl()} alt={user?.username} className="w-full h-full object-cover" onError={(e) => { e.target.src = `https://api.dicebear.com/9.x/dylan/svg?seed=fallback`; }} />
                            {/* Overlay for rank icon context */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                {React.createElement(Icons[currentRank.icon], { size: 40, className: "text-primary drop-shadow-[0_0_10px_rgba(0,255,157,0.8)]" })}
                            </div>
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface border border-primary/20 rounded-full text-[10px] font-mono text-primary font-bold whitespace-nowrap">
                            LEVEL {currentRankIndex} • {currentRank.title}
                        </div>
                    </div>

                    {/* Rank Details */}
                    <div className="flex-grow w-full space-y-4 text-center md:text-left">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
                            <div>
                                <div className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-1">OPERATIVE IDENTITY</div>
                                <h2 className="text-4xl font-rajdhani font-bold text-white">{user?.username}</h2>
                                <div className="flex items-center gap-4">
                                    <p className="text-primary font-mono text-sm">{user?.publicId}</p>
                                    <div className="flex gap-2">
                                        {user?.socials?.twitter && (
                                            <a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                                                <Icons.Twitter size={14} />
                                            </a>
                                        )}
                                        {user?.socials?.linkedin && (
                                            <a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                                                <Icons.Linkedin size={14} />
                                            </a>
                                        )}
                                        {user?.socials?.website && (
                                            <a href={user.socials.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                                                <Icons.Globe size={14} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-mono text-primary font-bold">{xp.toLocaleString()} <span className="text-sm text-gray-500">XP</span></div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono text-gray-400">
                                <span>Progress to {nextRank ? nextRank.title : 'MAX RANK'}</span>
                                {nextRank && <span>{progressPercent}%</span>}
                            </div>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-primary/50 to-primary box-shadow-[0_0_20px_rgba(0,255,157,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                />
                            </div>
                            {nextRank && (
                                <div className="text-xs text-right text-gray-600 font-mono">
                                    {(nextRank.minXp - xp).toLocaleString()} XP to promotion
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-surface border border-white/10 rounded-2xl p-8 max-w-md w-full space-y-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-orbitron text-white">EDIT IDENTITY</h3>
                                <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Operative Codename</label>
                                    <input
                                        type="text"
                                        value={editForm.username}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 focus:outline-none font-rajdhani font-bold text-lg"
                                    />
                                    <p className="text-[10px] text-gray-600 mt-1">* Can be changed once every 30 days.</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">Avatar Source URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={editForm.avatar}
                                            onChange={(e) => setEditForm(prev => ({ ...prev, avatar: e.target.value }))}
                                            className="flex-1 bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-primary/50 focus:outline-none"
                                            placeholder="https://..."
                                        />
                                        <div className="w-12 h-12 rounded-lg border border-white/10 overflow-hidden shrink-0">
                                            <img src={editForm.avatar || `https://api.dicebear.com/9.x/dylan/svg?seed=${editForm.username}`} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = `https://api.dicebear.com/9.x/dylan/svg?seed=fallback`; }} />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2 overflow-x-auto pb-2 no-scrollbar">
                                        {['pixel-art', 'adventurer', 'bottts', 'identicon'].map(seed => (
                                            <button
                                                key={seed}
                                                onClick={() => setEditForm(prev => ({ ...prev, avatar: `https://api.dicebear.com/9.x/${seed}/svg?seed=${prev.username}` }))}
                                                className="text-[10px] px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-gray-400 border border-white/5 whitespace-nowrap"
                                            >
                                                Generate {seed}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2 border-t border-white/5">
                                    <h4 className="text-sm font-mono text-gray-400 uppercase">Comm Links</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex items-center gap-2">
                                            <Icons.Twitter size={16} className="text-blue-400" />
                                            <input
                                                type="text"
                                                value={editForm.socials.twitter}
                                                onChange={(e) => setEditForm(prev => ({ ...prev, socials: { ...prev.socials, twitter: e.target.value } }))}
                                                className="flex-1 bg-black/50 border border-white/10 rounded p-2 text-white text-sm focus:border-primary/50 focus:outline-none"
                                                placeholder="Twitter Handle / URL"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icons.Linkedin size={16} className="text-blue-600" />
                                            <input
                                                type="text"
                                                value={editForm.socials.linkedin}
                                                onChange={(e) => setEditForm(prev => ({ ...prev, socials: { ...prev.socials, linkedin: e.target.value } }))}
                                                className="flex-1 bg-black/50 border border-white/10 rounded p-2 text-white text-sm focus:border-primary/50 focus:outline-none"
                                                placeholder="LinkedIn Profile URL"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icons.Globe size={16} className="text-green-400" />
                                            <input
                                                type="text"
                                                value={editForm.socials.website}
                                                onChange={(e) => setEditForm(prev => ({ ...prev, socials: { ...prev.socials, website: e.target.value } }))}
                                                className="flex-1 bg-black/50 border border-white/10 rounded p-2 text-white text-sm focus:border-primary/50 focus:outline-none"
                                                placeholder="Portfolio Website URL"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border-0 shadow-none"
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    onClick={handleSaveProfile}
                                    className="flex-1"
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'UPDATING...' : 'SAVE CHANGES'}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface/20 border border-white/5 p-6 rounded-xl text-center hover:border-white/10 transition-colors">
                    <div className="text-3xl font-orbitron font-bold text-white mb-2">{totalModulesCompleted}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Modules Complete</div>
                </div>
                <div className="bg-surface/20 border border-white/5 p-6 rounded-xl text-center hover:border-white/10 transition-colors">
                    <div className="text-3xl font-orbitron font-bold text-white mb-2">{unlockedCount} <span className="text-lg text-gray-600">/ {totalMedals}</span></div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Medals Earned</div>
                </div>
                <div className="bg-surface/20 border border-white/5 p-6 rounded-xl text-center hover:border-white/10 transition-colors">
                    <div className="text-3xl font-orbitron font-bold text-white mb-2">12 <span className="text-sm text-gray-600">HRS</span></div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Time in Sim (Est)</div>
                </div>
                <div className="bg-surface/20 border border-white/5 p-6 rounded-xl text-center hover:border-white/10 transition-colors">
                    <div className="text-3xl font-orbitron font-bold text-white mb-2">3</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Day Streak</div>
                </div>
            </div>

            {/* Medals Trophy Case */}
            <div className="space-y-6">
                <h3 className="text-xl font-orbitron font-bold text-white flex items-center gap-3">
                    <Icons.Award className="text-primary" />
                    COMMENDATIONS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MEDALS.map((medal) => {
                        const isUnlocked = unlockedMedals.includes(medal.id);
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
                                        <div className="pt-2">
                                            <span className={cn("text-[10px] uppercase px-2 py-0.5 rounded border", isUnlocked ? "border-primary/20 text-primary bg-primary/5" : "border-white/10 text-gray-600")}>
                                                +{medal.xpReward} XP
                                            </span>
                                        </div>
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

export default ServiceRecord;
