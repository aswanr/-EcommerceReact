import axios from "axios";
import React, { useEffect,useState } from "react";
import "../../styles/Home.css";
import SigOut from "../../context/SignOut";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../context/AuthContext";


interface setusers {
  id: number;
  first_name: string;
  password: string; 
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const data = decodeToken(); 
  const [setusers, setUser] = useState<setusers | null>(null); 
  const token = localStorage.getItem("token"); 
  const verify = async (): Promise<void> => {
    try {
      if (!token) {
        localStorage.removeItem("token");
        navigate("/");
        console.log("No token found, redirecting...");
        return;
      }

      const response = await axios.get("http://localhost:3001/user/products", {
        headers: {
          Authorization: `Bearer ${token}`, 
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      console.log("User verified:", response.data);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
      console.error("Error:", axios.isAxiosError(error) ? error.response?.data || error.message : error);
    }
  };

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const user = data[0].data[0];
      setUser(user); 
    } else {
      setUser(null);
    }
    verify();
  }, [data, token,navigate ]); 
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">Shoppee</div>
        <ul className="nav-links">
        <li>{setusers?.first_name ?? "Guest"}</li>
          <li>Shorts</li>
          <li>Jackets</li>
          <li>Pants</li>
        </ul>
        <div className="nav-buttons">
          <button
            className="btn btn-signin"
            onClick={(SigOut)}
          >
            Sign OUT
          </button>
          <button className="btn btn-saved">Carts(0)</button>
        </div>
      </nav>
      <div className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Explore</h1>
          <p>Find the right dress for you</p>
          <div className="hero-buttons">
            <button className="btn btn-yellow">Product</button>
            <button className="btn btn-orange">Sell your items</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
