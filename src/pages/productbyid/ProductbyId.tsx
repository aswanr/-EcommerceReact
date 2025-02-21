import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gettingDatas } from "../../api/apihandling/apihanding";
import Footer from "../../components/footer/footer";
import Searchbar from "../../components/searchbar/searchbar";
import { LuShoppingBag } from "react-icons/lu";
import CartRemoveButton from "../../components/cartbuttons/cartButtons";
import "./productsbyid.css";
import { addToCart } from "../../redux/cart";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  category_id: number;
  name: string;
  price: number;
  description: string;
  product_image: string;
  created_time: string;
  count: number;
}

function SingleProduct() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [product, setProducts] = useState<Product | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const response = await gettingDatas(`/productbyid/${id}`);
        const data = response.data[0];
        setProducts(data[0]);
      } catch (err) {
        console.log("error occurred:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Searchbar />
      <section key={product.id} className="product">
        <div className="product__photo">
          <div className="photo-container">
            <div className="photo-main">
              <div className="controls">
                <i className="material-icons">{product.id}</i>
                <i className="material-icons">{product.name}</i>
              </div>
              <img src={product.product_image} alt="shirt" />
            </div>
          </div>
        </div>
        <div className="product__info">
          <div className="title">
            <h1>{product.name}</h1>
            <span>COD: 45999</span>
          </div>
          <div className="price">
            R$ <span>{product.price}</span>
          </div>
          <div className="description">
            <h3>BENEFITS</h3>
            <ul>
              <li>Water Proof</li>
              <li>Stainless</li>
              <li>100% Cotton</li>
              <li>Wash proof</li>
            </ul>
          </div>
          <button className="buy--btn">Buy Now</button>
          <button
            className="cart-button"
            onClick={() => {dispatch(addToCart(product))
              navigate('/cartitems');
            }}>
            <LuShoppingBag className="bag-icon" />
            Add to cart
          </button>
          <CartRemoveButton id={product.id}/>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default SingleProduct;
