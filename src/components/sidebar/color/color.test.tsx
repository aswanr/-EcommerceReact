import { render, screen } from '@testing-library/react';
import Color from './color';

describe('Color Component', () => {
  test('renders color options', () => {
    render(<Color />);
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByText('Green')).toBeInTheDocument();
    expect(screen.getByText('RED')).toBeInTheDocument();
  });

  test('checks for radio buttons', () => {
    render(<Color />);
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(5);
  });
});
