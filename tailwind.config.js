/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--bg-background) / <alpha-value>)",
                surface: "rgb(var(--bg-surface) / <alpha-value>)",
                primary: "rgb(var(--c-primary) / <alpha-value>)",
                secondary: "rgb(var(--c-secondary) / <alpha-value>)",
                accent: "rgb(var(--c-accent) / <alpha-value>)",
                muted: "rgb(var(--c-muted) / <alpha-value>)",
                border: "rgb(var(--c-border) / <alpha-value>)",
                'text-main': "rgb(var(--c-text-main) / <alpha-value>)",
            },
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                rajdhani: ['Rajdhani', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
            },
            animation: {
                'scan': 'scan 4s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                scan: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '0% 100%' },
                }
            }
        },
    },
    plugins: [],
}
