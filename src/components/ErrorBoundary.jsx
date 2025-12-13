import React from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import Button from './ui/Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-lg text-center backdrop-blur-xl">
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-orbitron font-bold mb-4">CRITICAL SYSTEM FAILURE</h1>
                        <p className="text-gray-400 mb-6 font-mono text-sm">
                            The application encountered an unexpected error.
                            <br />
                            <span className="text-red-400 text-xs mt-2 block">{this.state.error?.message}</span>
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => window.location.href = '/'} variant="primary">
                                <Home className="mr-2 w-4 h-4" /> REBOOT SYSTEM
                            </Button>
                            <Button onClick={() => { localStorage.clear(); window.location.reload(); }} variant="ghost" className="text-xs text-gray-500">
                                CLEAR CACHE & RESTART
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
