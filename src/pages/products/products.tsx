import Sidebar from "../../components/sidebar/sidebar";
import "./products.css";
import { useLocation } from "react-router-dom";
import Productitem from "../../components/product/product";
import Searchbar from "../../components/searchbar/searchbar";
import Header from "../../components/navbar/navbar";

interface SetUsers {
  id: number;
  first_name: string;
  password: string;
}

function Product() {
  const location = useLocation();
  const user: SetUsers | null = location.state?.user || null;

  return (
    <>
      {user && <Header setusers={user} />}
      <Searchbar />
      <Sidebar />
      <section className="card-container">
        <Productitem />
      </section>
    </>
  );
}

export default Product;
