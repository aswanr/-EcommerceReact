import { render, screen,} from '@testing-library/react';
import SingleProduct from './ProductbyId';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SingleProduct Component', () => {
  test('fetches and displays product data', async () => {
    const mockProduct = {
      id: 1,
      category_id: 1,
      name: 'Test Product',
      price: 100,
      description: 'This is a test product',
      created_time: '2025-02-01',
    };

    mockedAxios.get.mockResolvedValueOnce({ data: { data: [mockProduct] } });
    render(
        <SingleProduct />
    );

    const productPrice = screen.getByText('Price $100');
    const productDescription = screen.getByText('This is a test product');
    expect(productPrice).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
  });

  test('displays loading message before product data is fetched', () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });
    render(
        <SingleProduct />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles errors gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch product'));
    render(
        <SingleProduct />
    );
    expect(console.log).toHaveBeenCalledWith('error occurred:', expect.any(Error));
  });
});
