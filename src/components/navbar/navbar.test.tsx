import { render, screen } from '@testing-library/react';

import Header from './navbar';

const mockSetUser = { id: 0, first_name: 'Guest', password: '' };
render(<Header setusers={mockSetUser} />);

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Header Component', () => {
  test('renders with user information', () => {
    const mockSetUser = { id: 1, first_name: 'Aswan', password: 'aswan123' };
    render(<Header setusers={mockSetUser} />);
    expect(screen.getByText('Aswan')).toBeInTheDocument();
  });

  test('renders as guest when no user is provided', () => {
    render(<Header setusers={mockSetUser} />);
    expect(screen.getByText('Guest')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Header setusers={mockSetUser} />);
    expect(screen.getByText('Shorts')).toBeInTheDocument();
    expect(screen.getByText('Jackets')).toBeInTheDocument();
    expect(screen.getByText('Pants')).toBeInTheDocument();
    expect(screen.getByText('Shoes')).toBeInTheDocument();
  });
});
