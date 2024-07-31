// src/__tests__/LoginForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm.jsx'; // Ruta corregida
import { supabase } from '../Utils/supabase';

jest.mock('../Utils/supabase', () => ({
    supabase: {
        auth: {
            signInWithPassword: jest.fn(),
            setSession: jest.fn()
        }
    }
}));

// Mockear window.alert
global.alert = jest.fn();

describe('LoginForm', () => {
    test('renders LoginForm component', () => {
        render(
            <Router>
                <LoginForm />
            </Router>
        );

        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    test('handles form submission', async () => {
        const mockSignIn = supabase.auth.signInWithPassword;
        mockSignIn.mockResolvedValue({
            data: {
                session: {
                    access_token: 'fake-access-token',
                    refresh_token: 'fake-refresh-token'
                }
            },
            error: null
        });

        render(
            <Router>
                <LoginForm />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'password123' }
        });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Login/i }));
        });

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123'
            });
            expect(mockSignIn).toHaveBeenCalledTimes(1);
        });
    });

    test('handles sign in error', async () => {
        const mockSignIn = supabase.auth.signInWithPassword;
        mockSignIn.mockResolvedValue({
            data: null,
            error: { message: 'Error signing in' }
        });

        render(
            <Router>
                <LoginForm />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'password123' }
        });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Login/i }));
        });

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123'
            });
            expect(mockSignIn).toHaveBeenCalledTimes(1);
            expect(global.alert).toHaveBeenCalledWith('Error signing in with password: [object Object]');
        });
    });
});
