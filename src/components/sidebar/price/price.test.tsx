import { render, screen, fireEvent } from '@testing-library/react';
import Price from './price';

describe('Price', () => {
  test('renders price', () => {
    render(<Price />);

    expect(screen.getByText('$0-50')).toBeInTheDocument();
    expect(screen.getByText('$50-100')).toBeInTheDocument();
    expect(screen.getByText('$100-500')).toBeInTheDocument();
    expect(screen.getByText('over - $1000')).toBeInTheDocument();
  });

  test('radio buttons', () => {
    render(<Price />);
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(4);  
  });

  test('price range', () => {
    render(<Price />);
    const priceRadioButton = screen.getByLabelText('$50-100');
    fireEvent.click(priceRadioButton);
    expect(priceRadioButton).toBeChecked();
  });
});
