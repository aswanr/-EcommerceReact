import { render, screen } from '@testing-library/react';
import Recommendedbutton from './recommendedbtn'

describe('Recommendedbutton Component', () => {
  test('renders the title', () => {
    render(<Recommendedbutton />);
    const titleElement = screen.getByText(/Recommended/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders all buttons', () => {
    render(<Recommendedbutton />);
    const buttons = ['All products', 'Alen Solly', 'Peter james', 'UCB', 'Levies'];
    buttons.forEach((btnText) => {
      const buttonElement = screen.getByText(btnText);
      expect(buttonElement).toBeInTheDocument();
    });
  });
});
