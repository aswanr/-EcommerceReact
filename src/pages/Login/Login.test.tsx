import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import axios from 'axios';
import Login from './loginForm';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Login component', () => {
    render(<Login />);

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/USERNAME:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/PASSWORD:/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: { token: 'test_token' },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'testPassword' } });

    fireEvent.click(screen.getByText(/Login/i));

    expect(localStorage.getItem('token')).toBe('test_token');
    expect(console.log).toHaveBeenCalledWith('Login successful');
  });

  test('handles form submission error', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: {
        data: { message: 'Login failed' },
      },
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrongPassword' } });

    fireEvent.click(screen.getByText(/Login/i));

  });

  test('handles server not reachable error', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'testPassword' } });

    fireEvent.click(screen.getByText(/Login/i));
  });
});
