import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { User, Globe, Twitter, Linkedin, Save, AlertCircle, CheckCircle, Camera, Award } from 'lucide-react';
import { BADGES } from '../data/badges';

const AVATAR_SEEDS = [
    'Felix', 'Aneka', 'Zack', 'Midnight', 'Cyber',
    'Glitch', 'Neo', 'Trinity', 'Morpheus', 'Oracle'
];

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const { unlockedBadges } = useProgress();

    // Form state
    const [username, setUsername] = useState(user?.username || '');
    const [website, setWebsite] = useState(user?.socials?.website || '');
    const [twitter, setTwitter] = useState(user?.socials?.twitter || '');
    const [linkedin, setLinkedin] = useState(user?.socials?.linkedin || '');
    const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '');

    // UI state
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setWebsite(user.socials?.website || '');
            setTwitter(user.socials?.twitter || '');
            setLinkedin(user.socials?.linkedin || '');
            setSelectedAvatar(user.avatar || `https://api.dicebear.com/9.x/dylan/svg?seed=${user.username}`);
        }
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setIsLoading(true);

        try {
            const updates = {
                username,
                avatar: selectedAvatar,
                socials: {
                    website,
                    twitter,
                    linkedin
                }
            };

            await updateUserProfile(user.username, updates);
            setMessage({ type: 'success', text: 'Profile updated successfully.' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to update profile.' });
        } finally {
            setIsLoading(false);
        }
    };

    const getAvatarUrl = (seed) => `https://api.dicebear.com/9.x/dylan/svg?seed=${seed}`;

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-orbitron font-bold text-white mb-2">OPERATOR PROFILE</h1>
                <p className="text-gray-400 font-mono text-sm">Customize your identity and communication channels.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Avatar Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-1"
                >
                    <div className="glass-card p-6 rounded-xl border border-white/10 flex flex-col items-center">
                        <div className="relative group mb-6">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 bg-black/50">
                                <img
                                    src={selectedAvatar}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                                className="absolute bottom-2 right-2 p-3 bg-primary text-black rounded-full shadow-[0_0_15px_rgba(0,255,157,0.4)] hover:bg-white transition-colors"
                            >
                                <Camera size={20} />
                            </button>
                        </div>

                        <div className="text-center w-full">
                            <h2 className="text-xl font-bold font-rajdhani text-white mb-1">{username}</h2>
                            <p className="text-xs font-mono text-primary border border-primary/30 py-1 px-2 rounded inline-block bg-primary/5">
                                {user?.rank || 'OPERATOR'}
                            </p>
                        </div>
                    </div>

                    {/* Avatar Selection Grid */}
                    <AnimatePresence>
                        {isEditingAvatar && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="glass-card mt-4 p-4 rounded-xl border border-white/10 overflow-hidden"
                            >
                                <h3 className="text-sm font-mono text-gray-400 mb-3">SELECT AVATAR</h3>
                                <div className="grid grid-cols-5 gap-2">
                                    {AVATAR_SEEDS.map((seed) => (
                                        <button
                                            key={seed}
                                            onClick={() => {
                                                setSelectedAvatar(getAvatarUrl(seed));
                                                setIsEditingAvatar(false);
                                            }}
                                            className="w-full aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-primary hover:shadow-[0_0_10px_rgba(0,255,157,0.3)] transition-all bg-black/40"
                                        >
                                            <img
                                                src={getAvatarUrl(seed)}
                                                alt={seed}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-2"
                >
                    <div className="glass-card p-8 rounded-xl border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <User size={120} />
                        </div>

                        <form onSubmit={handleSave} className="space-y-6 relative z-10">
                            <AnimatePresence>
                                {message.text && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`p-3 rounded-lg flex items-center gap-3 border ${message.type === 'error'
                                            ? 'bg-red-500/10 border-red-500/30 text-red-500'
                                            : 'bg-primary/10 border-primary/30 text-primary'
                                            }`}
                                    >
                                        {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                                        <span className="text-sm font-mono">{message.text}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Identity</label>
                                    <Input
                                        label="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        icon={User}
                                        placeholder="Enter new username"
                                    />
                                    <p className="text-[10px] text-gray-600 mt-1 font-mono">
                                        * Username can only be changed once every 30 days.
                                    </p>
                                </div>

                                <div className="border-t border-white/5 my-6 pt-6">
                                    <label className="block text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider">Comms Channels</label>

                                    <div className="space-y-4">
                                        <Input
                                            label="Website URL"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            icon={Globe}
                                            placeholder="https://your-website.com"
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                label="Twitter / X"
                                                value={twitter}
                                                onChange={(e) => setTwitter(e.target.value)}
                                                icon={Twitter}
                                                placeholder="@handle"
                                            />
                                            <Input
                                                label="LinkedIn"
                                                value={linkedin}
                                                onChange={(e) => setLinkedin(e.target.value)}
                                                icon={Linkedin}
                                                placeholder="Profile URL"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    icon={Save}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Badges Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12"
            >
                <div className="glass-card p-8 rounded-xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Award size={120} />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-orbitron font-bold text-white mb-2 flex items-center gap-3">
                            <Award className="text-primary" size={28} />
                            ACHIEVEMENTS
                        </h2>
                        <p className="text-gray-400 font-mono text-sm mb-8">
                            Complete learning paths to unlock badges
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {BADGES.map((badge) => (
                                <Badge
                                    key={badge.id}
                                    badge={badge}
                                    unlocked={unlockedBadges.includes(badge.id)}
                                />
                            ))}
                        </div>

                        {unlockedBadges.length === 0 && (
                            <div className="mt-8 p-6 border border-white/5 rounded-lg bg-black/20 text-center">
                                <p className="text-gray-500 font-mono text-sm">
                                    No badges unlocked yet. Complete your first learning path to earn your first badge!
                                </p>
                            </div>
                        )}

                        {unlockedBadges.length > 0 && (
                            <div className="mt-8 p-4 border border-primary/20 rounded-lg bg-primary/5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-mono text-gray-400">BADGES UNLOCKED</span>
                                    <span className="text-2xl font-bold text-primary">{unlockedBadges.length} / {BADGES.length}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
