interface User {
  id: number;
  first_name: string;
  password: string;
}
interface DecodedToken {
  data: User[]; 
  exp: number;
  iat: number;
}
export const decodeToken = (): DecodedToken[] | null => {
  const token = localStorage.getItem("token");
  if (!token) return null; 

  try {
    const decoded: DecodedToken[] = JSON.parse(atob(token.split(".")[1])); 
    return Array.isArray(decoded) ? decoded : [decoded]; 
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
