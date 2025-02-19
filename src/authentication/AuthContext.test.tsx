import { decodeToken } from "./AuthContext";

describe('decodeToken', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should return null if no token is present', () => {
    const result = decodeToken();
    expect(result).toBeNull();
  });

  test('should decode a valid token', () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJkYXRhIjpbeyJpZCI6MSwiZmlyc3RfbmFtZSI6IkpvaG4iLCJwYXNzd29yZCI6InBhc3N3b3JkIn1dLCJleHAiOjE2MzIxNzM4MDAsImlhdCI6MTYzMjE3MzgxMX0.' +
      'dummySignature';
    localStorage.setItem('token', validToken);
    
    const result = decodeToken();
    expect(result).toEqual([
      {
        data: [
          {
            id: 1,
            first_name: 'John',
            password: 'password',
          },
        ],
        exp: 1632173800,
        iat: 1632173811,
      }
    ]);
  });

  test('should handle token with invalid JSON payload', () => {
    const invalidJsonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'invalidpayload.' +
      'dummySignature';
    localStorage.setItem('token', invalidJsonToken);
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const result = decodeToken();
    
    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to decode token:', expect.any(SyntaxError));
    
    consoleErrorSpy.mockRestore();
  });

  test('should handle malformed token', () => {
    const malformedToken = 'malformed.token';
    localStorage.setItem('token', malformedToken);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const result = decodeToken();

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to decode token:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  test('should return an array with the decoded token even if it is not an array', () => {
    const validSingleObjectToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJkYXRhIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiSm9obiIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwgImV4cCI6MTYzMjE3MzgwMCwiaWF0IjoxNjMyMTczODExfQ.' +
      'dummySignature';
    localStorage.setItem('token', validSingleObjectToken);
    
    const result = decodeToken();
    expect(result).toEqual([
      {
        data: {
          id: 1,
          first_name: 'John',
          password: 'password',
        },
        exp: 1632173800,
        iat: 1632173811,
      }
    ]);
  });
});
