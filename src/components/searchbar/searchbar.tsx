import './searchbar.css';
import {FiHeart} from 'react-icons/fi';
import { AiOutlineShoppingCart,AiOutlineUserAdd} from 'react-icons/ai';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

interface CartState {
  cart: {
    carlist: [];
    cartcount: number;
  };
}

function Searchbar(){
    const navigate=useNavigate();
    const {carlist} = useSelector((state: CartState) => state.cart);
    return <>
    <nav>
        <div className="nav-container">
            <input type="text" placeholder='Enter Your Search Dress' className='search-input'/>
        </div>
        <div className="profile-container">
            <a href=" " aria-label="Favorite">
                <FiHeart className='nav-icons'/>
            </a>
            <a href=" " onClick={()=>{navigate("/cartitems")}}>
                <AiOutlineShoppingCart className='nav-icons'/>
                {carlist.length}
            </a>
            <a href=" " aria-label="Favorite">
                <AiOutlineUserAdd className='nav-icons'/>
            </a>
        </div>
        </nav>
    </>
}
export default Searchbar;