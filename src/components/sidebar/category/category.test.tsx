import { render, screen } from '@testing-library/react';
import Category from './category';

describe('Category Component', () => {
  test('renders category options', () => {
    render(<Category />);
    expect(screen.getByText('ALL')).toBeInTheDocument();
    expect(screen.getByText('Shirts')).toBeInTheDocument();
    expect(screen.getByText('Pants')).toBeInTheDocument();
    expect(screen.getByText('T-Shirts')).toBeInTheDocument();
    expect(screen.getByText('Shorts')).toBeInTheDocument();
  });

  test('checks for radio buttons', () => {
    render(<Category />);

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(5);  
  });
});
