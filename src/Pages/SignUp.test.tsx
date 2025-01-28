import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import SignUp from './SignUp';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders SignUp form correctly', () => {
    render(<SignUp />);
    
    expect(screen.getByText(/Create your account/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();

    // Check for the submit button
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('updates input values correctly', () => {
    render(<SignUp />);

    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect((nameInput as HTMLInputElement).value).toBe('John Doe');
    expect((emailInput as HTMLInputElement).value).toBe('john.doe@example.com');
    expect((passwordInput as HTMLInputElement).value).toBe('password123');
  });

  test('handles form submission', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<SignUp />);

    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    // Fill out the form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Click the submit button
    fireEvent.click(submitButton);

    // Ensure axios.post was called with correct arguments
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3003/signup', {
      username: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(window.alert).toHaveBeenCalledWith('Sign up completed John Doe');
  });
});
