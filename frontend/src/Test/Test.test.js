import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm.jsx';
import ProfileConfig from '../Components/ProfileConfig/ProfileConfig.jsx';
import RegisterForm from '../Components/RegisterForm/RegisterForm.jsx';
import AddBook from '../Components/AddBook/AddBook.jsx';
import { supabase } from '../Utils/supabase.js';

jest.mock('../Utils/supabase', () => ({
    supabase: {
        auth: {
            signInWithPassword: jest.fn(),
            setSession: jest.fn(),
            getUser: jest.fn(),
        }
    }
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
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
            target: { value: 'angelherrarte3@gmail.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: '123456' }
        });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Login/i }));
        });

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith({
                email: 'angelherrarte3@gmail.com',
                password: '123456'
            });
            expect(mockSignIn).toHaveBeenCalledTimes(1);
        });
    });
});

describe('RegisterForm', () => {
    test('renders RegisterForm component', () => {
        render(
            <Router>
                <RegisterForm />
            </Router>
        );
        expect(screen.getByRole('heading', { name: /Register/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument();
    });

    test('handle user input', () => {
        render(
            <Router>
                <RegisterForm />
            </Router>
        );

        // Check if the form renders with the correct fields
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Access code')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'User' } });
        fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Access code'), { target: { value: 'validcode' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

        // Verify that the input fields have the expected values
        expect(screen.getByPlaceholderText('Username').value).toBe('testuser');
        expect(screen.getByPlaceholderText('Name').value).toBe('Test');
        expect(screen.getByPlaceholderText('Last Name').value).toBe('User');
        expect(screen.getByPlaceholderText('E-mail').value).toBe('test@example.com');
        expect(screen.getByPlaceholderText('Access code').value).toBe('validcode');
        expect(screen.getByPlaceholderText('Password').value).toBe('password');

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));
    });
});

describe('ProfileConfig', () => {
    test('renders profile data and handles input changes', async () => {
        supabase.auth.getUser.mockResolvedValue({
            data: {
                user: {
                    user_metadata: { name: 'John', lastname: 'Doe' },
                    email: 'john.doe@example.com'
                }
            },
            error: null
        });

        render(<ProfileConfig />);

        // Verify initial input values from the mocked profile data
        expect(await screen.findByDisplayValue('John')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();

        // Simulate input change
        fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Jane' } });
        fireEvent.change(screen.getByLabelText(/Apellido:/i), { target: { value: 'Smith' } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'jane.smith@example.com' } });

        // Verify the state update by checking the new values in the input fields
        expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Smith')).toBeInTheDocument();
        expect(screen.getByDisplayValue('jane.smith@example.com')).toBeInTheDocument();
    });
});