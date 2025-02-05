import { decodeToken } from "./AuthContext";
global.atob = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("decodeToken", () => {
  it("should return decoded token data when token is valid", () => {
    const mockToken = "header.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IkpvaG4iLCJwYXNzd29yZCI6IkpvaG5wYXNzMTIzIn0.signature";
    
    localStorage.setItem("token", mockToken);
    const mockDecoded = { id: 1, first_name: "John", password: "Johnpass123" };
    (atob as jest.Mock).mockReturnValueOnce(JSON.stringify(mockDecoded));

    const result = decodeToken();

    console.log(result); 
    expect(result).toEqual([{
      data: [mockDecoded], 
      exp: expect.any(Number), 
      iat: expect.any(Number)
    }]);
  });

  it("should return null if no token is found", () => {
    localStorage.removeItem("token");
    const result = decodeToken();
    expect(result).toBeNull();
  });

  it("should return null if token is malformed", () => {
    const malformedToken = "header.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IkpvaG4i";
    localStorage.setItem("token", malformedToken);

    (atob as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Failed to decode token");
    });

    const result = decodeToken();
    expect(result).toBeNull();
  });

  it("should handle an invalid JSON in the decoded token", () => {
    const invalidToken = "header.some_invalid_data";
    localStorage.setItem("token", invalidToken);

    (atob as jest.Mock).mockImplementationOnce(() => {
      return "{ invalidJson: ";
    });

    const result = decodeToken();
    expect(result).toBeNull();
  });

  it("should return a single decoded token object when not an array", () => {
    const mockToken = "header.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IkpvaG4iLCJwYXNzd29yZCI6IkpvaG5wYXNzMTIzIn0.signature";
    localStorage.setItem("token", mockToken);

    const mockDecoded = { id: 1, first_name: "John", password: "Johnpass123" };
    (atob as jest.Mock).mockReturnValueOnce(JSON.stringify(mockDecoded));

    const result = decodeToken();
    
    console.log(result);

    expect(result).toEqual([{
      data: [mockDecoded], 
      exp: expect.any(Number), 
      iat: expect.any(Number)
    }]);
  });
});
