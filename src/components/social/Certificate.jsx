import React from 'react';
import { motion } from 'framer-motion';
import { Download, X, Share2, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';

const Certificate = ({ user, path, date, onClose }) => {
    // Generate a pseudo-random certification ID
    const certId = `CRT-${path.id.toUpperCase()}-${user.publicId}-${Date.now().toString().slice(-4)}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative max-w-4xl w-full bg-black border-2 border-primary/50 p-2 md:p-4 shadow-[0_0_100px_rgba(0,255,157,0.2)]"
            >
                {/* Certificate Container */}
                <div className="bg-surface border border-white/10 p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[600px]">
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle at center, #00ff9d 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary"></div>

                    {/* Logo / Header */}
                    <div className="mb-12">
                        <ShieldCheck className="w-24 h-24 text-primary mx-auto mb-4 drop-shadow-[0_0_15px_rgba(0,255,157,0.5)]" />
                        <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white tracking-[0.2em] mb-2 uppercase">
                            CERTIFICATE
                        </h1>
                        <p className="text-xl md:text-2xl font-rajdhani text-gray-400 tracking-widest uppercase">
                            OF COMPLETION
                        </p>
                    </div>

                    {/* Body */}
                    <div className="space-y-6 mb-16 relative z-10">
                        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">This certifies that</p>

                        <h2 className="text-3xl md:text-5xl font-rajdhani font-bold text-white underline decoration-primary/50 underline-offset-8 decoration-2">
                            {user.username}
                        </h2>

                        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mt-8">Has successfully completed the</p>

                        <h3 className="text-2xl md:text-4xl font-orbitron font-bold text-primary mb-2 uppercase drop-shadow-[0_0_10px_rgba(0,255,157,0.3)]">
                            {path.title}
                        </h3>

                        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            Demonstrating proficiency in {path.description.toLowerCase()}.
                        </p>
                    </div>

                    {/* Footer / Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-white/10 pt-8 mt-auto">
                        <div className="text-center md:text-left">
                            <p className="text-[10px] text-gray-500 font-mono uppercase">Date Issued</p>
                            <p className="text-white font-mono">{date}</p>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-24 bg-white p-2 mx-auto mb-2 opacity-80">
                                {/* Pseudo-QR Code Placeholder */}
                                <div className="w-full h-full bg-black flex items-center justify-center text-[8px] text-white text-center break-all font-mono leading-none">
                                    [QR CODE VERIFICATION]
                                    {certId}
                                </div>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-[10px] text-gray-500 font-mono uppercase">Certification ID</p>
                            <p className="text-primary font-mono text-sm">{certId}</p>
                        </div>
                    </div>
                </div>

                {/* Actions Bar (No-Print) */}
                <div className="bg-surface border-t border-white/10 p-4 flex justify-between items-center print:hidden">
                    <button onClick={onClose} className="text-gray-500 hover:text-white flex items-center gap-2">
                        <X size={20} /> CLOSE
                    </button>
                    <div className="flex gap-4">
                        <Button onClick={() => window.print()} className="bg-primary hover:bg-primary-hover text-black font-bold">
                            <Download size={18} className="mr-2" /> DOWNLOAD / PRINT
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Certificate;
