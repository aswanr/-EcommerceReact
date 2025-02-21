import React, { useEffect, useState, useCallback } from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../authentication/AuthContext";
import Header from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

interface SetUsers {
  id: number;
  first_name: string;
  password: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SetUsers | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const verify = useCallback(async () => {
    try {
      if (!token) {
        localStorage.get("token");
        navigate("/");
        console.log("No token found, redirecting...");
      } else {
        console.log("Login successfully");
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [token,navigate]);

  useEffect(() => {
    const initToken = localStorage.getItem("token");
    setToken(initToken);
  }, []);

  useEffect(() => {
    if (token) {
      const data = decodeToken();
      if (Array.isArray(data) && data.length > 0) {
        const user = data[0].data[0];
        setUser(user);
        verify();
      }
    }
  }, [token, verify]);

  const goToAnotherPage = () => {
    navigate("/product", { state: { user } });
  };

  return (
    <div className="homepage">
      {user && <Header setusers={user} />}
      <div className="hero">
        <div className="slideshow">
          <div className="slide slide1"></div>
          <div className="slide slide2"></div>
          <div className="slide slide3"></div>
        </div>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Explore</h1>
          <p>Find the right dress for you</p>
          <div className="hero-buttons">
            <button className="btn btn-yellow" onClick={goToAnotherPage}>
              Product
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
