import { Hammer, Sword, Shield, GitMerge, Hexagon } from 'lucide-react';

/**
 * Badge definitions for completing learning paths
 * Each badge is awarded when a user completes 100% of a learning path
 */
export const BADGES = [
    {
        id: 'forge-master',
        title: 'FORGE MASTER',
        description: 'Completed the FORGE path - Foundation mastered',
        pathId: 'forge',
        icon: Hammer,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-400/10',
        borderColor: 'border-cyan-400/30',
        glowColor: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]'
    },
    {
        id: 'exploit-specialist',
        title: 'EXPLOIT SPECIALIST',
        description: 'Completed the EXPLOIT path - Offensive security mastered',
        pathId: 'exploit',
        icon: Sword,
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        borderColor: 'border-accent/30',
        glowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]'
    },
    {
        id: 'defense-guardian',
        title: 'DEFENSE GUARDIAN',
        description: 'Completed the PROTECTOR path - Defensive security mastered',
        pathId: 'protector',
        icon: Shield,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
        glowColor: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]'
    },
    {
        id: 'convergence-engineer',
        title: 'CONVERGENCE ENGINEER',
        description: 'Completed the CONVERGENCE path - Purple team mastered',
        pathId: 'convergence',
        icon: GitMerge,
        color: 'text-purple-400',
        bgColor: 'bg-purple-400/10',
        borderColor: 'border-purple-400/30',
        glowColor: 'shadow-[0_0_20px_rgba(192,132,252,0.3)]'
    },
    {
        id: 'architect-elite',
        title: 'ARCHITECT ELITE',
        description: 'Completed the ARCHITECT path - System design mastered',
        pathId: 'overwatch',
        icon: Hexagon,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-400/10',
        borderColor: 'border-yellow-400/30',
        glowColor: 'shadow-[0_0_20px_rgba(250,204,21,0.3)]'
    }
];

/**
 * Get badge by path ID
 */
export const getBadgeByPathId = (pathId) => {
    return BADGES.find(badge => badge.pathId === pathId);
};

/**
 * Get badge by badge ID
 */
export const getBadgeById = (badgeId) => {
    return BADGES.find(badge => badge.id === badgeId);
};
