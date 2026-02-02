import { Trophy, Target, Shield, Zap, BookOpen, Coffee, Award, Crown } from 'lucide-react';

export const RANKS = [
    { id: 'rank_0', title: 'FUTURE WARRIOR', minXp: 0, icon: 'Zap' },
    { id: 'rank_1', title: 'NEOPHYTE', minXp: 500, icon: 'BookOpen' },
    { id: 'rank_2', title: 'OPERATOR', minXp: 2000, icon: 'Target' },
    { id: 'rank_3', title: 'SPECIALIST', minXp: 5000, icon: 'Shield' },
    { id: 'rank_4', title: 'HACKER ELITE', minXp: 10000, icon: 'Trophy' },
    { id: 'rank_5', title: 'ARCHITECT', minXp: 20000, icon: 'Crown' },
    { id: 'rank_6', title: 'ASCENDANT', minXp: 100000, icon: 'Award' },
];

export const MEDALS = [
    {
        id: 'medal_first_blood',
        title: 'First Blood',
        description: 'Completed your first module.',
        xpReward: 100,
        icon: 'Zap',
        condition: (stats) => stats.modulesCompleted >= 1
    },
    {
        id: 'medal_forge_master',
        title: 'Forge Master',
        description: 'Completed the Forge path.',
        xpReward: 1000,
        icon: 'BookOpen',
        condition: (stats) => stats.pathsCompleted.includes('forge')
    },
    {
        id: 'medal_red_team',
        title: 'Red Teamer',
        description: 'Completed 10 Exploit modules.',
        xpReward: 500,
        icon: 'Target',
        condition: (stats) => stats.pathProgress['exploit'] >= 10
    },
    {
        id: 'medal_blue_team',
        title: 'Blue Teamer',
        description: 'Completed 10 Protector modules.',
        xpReward: 500,
        icon: 'Shield',
        condition: (stats) => stats.pathProgress['protector'] >= 10
    },
    {
        id: 'medal_dedication',
        title: 'Dedicated',
        description: 'Logged in 3 days in a row.',
        xpReward: 300,
        icon: 'Coffee',
        condition: (stats) => stats.loginStreak >= 3
    }
];
