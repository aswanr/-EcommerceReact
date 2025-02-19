import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedRoutes from './protectedroutes';

// Mock the react-router-dom components
jest.mock('react-router-dom', () => ({
  Outlet: () => <div>Mocked Outlet</div>,
  Navigate: ({ to }: { to: string }) => <div>Mocked Navigate to {to}</div>,
}));

describe('ProtectedRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Outlet when token is present', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => 'mockedToken');

    render(<ProtectedRoutes />);

    expect(screen.getByText('Mocked Outlet')).toBeInTheDocument();
  });

  test('navigates to root when token is not present', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);

    render(<ProtectedRoutes />);

    expect(screen.getByText('Mocked Navigate to /')).toBeInTheDocument();
  });
});
