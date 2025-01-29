import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  it('renders input fields and login button', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('SignUp')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    axios.post = jest.fn().mockResolvedValue({ status: 200 });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(screen.getByText('Login'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/login/user', {
        username: 'johndoe',
        password: 'password123',
      });
      expect(screen.getByText('User Founded')).toBeInTheDocument();
    });
  });

  it('displays error message on failed login', async () => {
    axios.post = jest.fn().mockRejectedValue(new Error('Unable to find'));

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.submit(screen.getByText('Login'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(screen.getByText('Unable to find')).toBeInTheDocument();
    });
  });
});
