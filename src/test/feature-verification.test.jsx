import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Pricing from '../pages/Pricing';
import AdminUsers from '../components/admin/AdminUsers';
import { ThemeProvider } from '../context/ThemeContext'; // If needed for rendering
import React from 'react';

// Mock MainLayout to avoid complex dependencies (Auth, Sidebar, BackgroundEffects)
vi.mock('../layouts/MainLayout', () => ({
    default: ({ children }) => <div data-testid="main-layout">{children}</div>
}));

// Mocks
vi.mock('../lib/firebase', () => ({
    db: {}
}));

// Mock Auth Context
vi.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        user: { role: 'admin', username: 'Tester', walletBalance: 100 },
        isAuthenticated: true,
        logout: vi.fn()
    }),
    AuthProvider: ({ children }) => <div>{children}</div>
}));

const mockGetDocs = vi.fn();
vi.mock('firebase/firestore', () => ({
    getDocs: (...args) => mockGetDocs(...args),
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    limit: vi.fn(),
    doc: vi.fn(),
}));

// Mock Firestore Service for AdminUsers
vi.mock('../lib/firestoreService', () => ({
    getAllUsers: vi.fn().mockResolvedValue([
        { id: '1', username: 'admin', email: 'admin@nytvnt.dev', role: 'admin', walletBalance: 9999 },
        { id: '2', username: 'predatr921', email: 'predatr921@gmail.com', role: 'learner', walletBalance: 50 },
        { id: '3', username: 'old_user', email: null, role: 'learner' } // Test null email safety
    ]),
    promoteUserToAdmin: vi.fn(),
    demoteAdminToLearner: vi.fn(),
    adminAddCoins: vi.fn()
}));

// Wrapper with Auth Context
const Wrapper = ({ children }) => {
    // Mock Auth Value
    const authValue = {
        user: { role: 'admin', username: 'Tester' },
        isAuthenticated: true,
        logout: vi.fn(),
        loading: false
    };

    // We can't easily mock the Context Provider itself without exporting the context object,
    // so we mock the HOOK `useAuth` completely in the `vi.mock` section.
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
};


describe('Project 10 Feature Verification', () => {

    describe('Pricing Page', () => {
        it('renders the 3 standard bundles correctly', async () => {
            // Mock empty DB return so it falls back to default plans options
            mockGetDocs.mockResolvedValueOnce({ empty: true, docs: [] });

            render(
                <Wrapper>
                    <Pricing />
                </Wrapper>
            );

            screen.debug();


            // Check for Plan Names
            // findBy* waits for the element to appear (async)
            expect(await screen.findByText('Starter Agent')).toBeInTheDocument();
            expect(await screen.findByText('Elite Operative')).toBeInTheDocument();
            expect(screen.getByText('Cyber Warlord')).toBeInTheDocument();

            // Check for Prices
            expect(screen.getByText('$19')).toBeInTheDocument();
            expect(screen.getByText('$49')).toBeInTheDocument();
            expect(screen.getByText('$99')).toBeInTheDocument();

            // Check for Coins
            expect(screen.getByText('500 COINS')).toBeInTheDocument();
        });
    });

    describe('Admin Console: User Search', () => {
        it('correctly filters users and handles missing data safely', async () => {
            render(<AdminUsers />);

            // Wait for users to load
            expect(await screen.findByText('admin@nytvnt.dev')).toBeInTheDocument();
            expect(screen.getByText('predatr921@gmail.com')).toBeInTheDocument();

            // SEARCH TEST
            const searchInput = screen.getByPlaceholderText(/Search by username/i);

            // 1. Search for specific user
            fireEvent.change(searchInput, { target: { value: 'predatr' } });

            // Admin should disappear, Predator should stay
            expect(screen.queryByText('admin@nytvnt.dev')).not.toBeInTheDocument();
            expect(screen.getByText('predatr921@gmail.com')).toBeInTheDocument();

            // 2. Clear search
            fireEvent.change(searchInput, { target: { value: '' } });
            expect(screen.getByText('admin@nytvnt.dev')).toBeInTheDocument();
        });

        it('does not crash when searching effectively handling null fields', async () => {
            render(<AdminUsers />);
            const searchInput = await screen.findByPlaceholderText(/Search by username/i);

            // Search for something that triggers the filter on the 'null email' user
            fireEvent.change(searchInput, { target: { value: 'old_user' } });

            // If regex/filter was broken, this line would not be reached (component crash)
            expect(screen.getByText('old_user')).toBeInTheDocument();
        });
    });

});
