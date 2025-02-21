import React, { useEffect, useState } from "react";
import "./product.css";
import { gettingDatas } from "../../api/apihandling/apihanding";
import { AiFillStar } from "react-icons/ai";
import { LuShoppingBag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  category_id: number;
  name: string;
  price: number;
  description: string;
  product_image: string;
  created_time: string;
}

function Productitem() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await gettingDatas("/user/products");
        const data = fetchedProducts.data[0];
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Unexpected error occurred:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      {products.map((item) => (
        <section key={item.id} className="cards">
          <div className="imge-card">
            <img
              src={item.product_image}
              alt={item.name}
              className="card-image"
            />
          </div>
          <div className="card-details">
            <h3 className="card-title">{item.name}</h3>
            <section className="card-reviews">
              <AiFillStar className="ratings-start" />
              <AiFillStar className="ratings-start" />
              <AiFillStar className="ratings-start" />
              <AiFillStar className="ratings-start" />
              <span className="total-reviews">4</span>
            </section>
            <section className="card-price">
              <div className="price">
                <del>300$</del> ${item.price}
              </div>
              <div className="bag">
                <LuShoppingBag className="bag-icon" />
              </div>
              <button
                className="btn-3"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                BUY
              </button>
            </section>
          </div>
        </section>
      ))}
    </>
  );
}

export default Productitem;
