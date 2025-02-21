import { render, screen } from '@testing-library/react';
import Sidebar from './sidebar';


describe('Sidebar Component', () => {
  test('renders logo', () => {
    render(<Sidebar />);
    const logo = screen.getByRole('heading', { level: 1 });
    expect(logo).toBeInTheDocument();
  });
});
