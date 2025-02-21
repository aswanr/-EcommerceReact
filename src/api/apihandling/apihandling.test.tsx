import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { gettingDatas, postingData } from './apihanding';

describe('API functions', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('gettingDatas', () => {
    it('should fetch data successfully', async () => {
      const mockData = { id: 1, name: 'Test Product' };
      mock.onGet('/1').reply(200, mockData);

      const data = await gettingDatas(1);
      expect(data).toEqual(mockData);
    });

    it('should handle error when fetching data', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      mock.onGet('/2').reply(500);

      const data = await gettingDatas(2);
      expect(data).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching products:', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });

  describe('postingData', () => {
    it('should post data successfully', async () => {
      const mockResponse = { success: true };
      const mockData = { name: 'New Product' };
      mock.onPost('/create', mockData).reply(200, mockResponse);

      const data = await postingData('/create', mockData);
      expect(data).toEqual(mockResponse);
    });

    it('should handle error when posting data', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockData = { name: 'New Product' };
      mock.onPost('/create', mockData).reply(500);

      await expect(postingData('/create', mockData)).rejects.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error posting data:', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });
});
