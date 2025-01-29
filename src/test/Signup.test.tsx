import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import SignUp from '../pages/Signup/SignupForm';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SignUp Component', () => {
  it('renders input fields and signup button', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    expect(screen.getByPlaceholderText('firstname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('lastname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('phonenumber')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    axios.post = jest.fn().mockResolvedValue({ status: 200 });

    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('firstname'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('lastname'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('phonenumber'), {
      target: { value: '1234567890' },
    });

    fireEvent.submit(screen.getByText('Signup'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/user/postuser', {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        password: 'password123',
        email: 'johndoe@example.com',
        phone_number: '1234567890',
        created_time: expect.any(Date),
      });
      expect(screen.getByText('Signup')).toBeInTheDocument();
    });
  });

  it('displays error message on failed submission', async () => {
    axios.post = jest.fn().mockRejectedValue(new Error('Unable to find'));

    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.submit(screen.getByText('Signup'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(screen.getByText('Unable to find')).toBeInTheDocument();
    });
  });
});
