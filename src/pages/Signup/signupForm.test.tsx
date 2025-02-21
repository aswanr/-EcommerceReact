import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './signupForm';
import { postingData } from '../../api/apihandling/apihanding';

jest.mock('../../api/apihandling/apihanding', () => ({
  postingData: jest.fn(() => Promise.resolve({ status: 200 })),
}));

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders SignUp component', () => {
    render(<SignUp />);

    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Choose a username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText(/Enter first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Choose a username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter phone number/i), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => {

      expect(postingData).toHaveBeenCalledWith('/user/postuser', {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        password: 'password123',
        email: 'john.doe@example.com',
        phone_number: '1234567890',
        created_time: expect.any(Date),
      });
    });

    expect(console.log).toHaveBeenCalledWith('Gotted the data');
  });

  test('handles form submission error', async () => {
    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText(/Enter first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Choose a username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter phone number/i), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => {

      expect(postingData).toHaveBeenCalledWith('/user/postuser', {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        password: 'password123',
        email: 'john.doe@example.com',
        phone_number: '1234567890',
        created_time: expect.any(Date),
      });
    });

    expect(screen.getByText(/Unable to find/i)).toBeInTheDocument();
  });

  test('displays validation errors', () => {
    render(<SignUp />);

    fireEvent.click(screen.getByText(/Sign Up/i));

    expect(screen.getByPlaceholderText(/Enter first name/i)).toBeInvalid();
    expect(screen.getByPlaceholderText(/Choose a username/i)).toBeInvalid();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInvalid();
    expect(screen.getByPlaceholderText(/Enter email/i)).toBeInvalid();
    expect(screen.getByPlaceholderText(/Enter phone number/i)).toBeInvalid();
  });
});
