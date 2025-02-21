import { render, screen } from '@testing-library/react';
import Product from './products';

jest.mock('../../components/searchbar/searchbar', () => {
    const MockSearchbar = () => <div>Searchbar</div>;
    MockSearchbar.displayName = 'Searchbar';
    return MockSearchbar;
  });
  
  jest.mock('../../components/sidebar/sidebar', () => {
    const MockSidebar = () => <div>Sidebar</div>;
    MockSidebar.displayName = 'Sidebar';
    return MockSidebar;
  });
  
  jest.mock('../../components/product/product', () => {
    const MockCarts = () => <div>Carts</div>;
    MockCarts.displayName = 'Carts';
    return MockCarts;
  });  
describe('Product Component', () => {
  test('renders Searchbar, Sidebar, and Carts components', () => {
    render(<Product />);
    expect(screen.getByText('Searchbar')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Carts')).toBeInTheDocument();
  });
});
