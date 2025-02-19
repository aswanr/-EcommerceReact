
import './sidebar.css';
import Category from './category/category'
import Price from './price/price';
import Color from './color/color';
import { BsCartDashFill } from "react-icons/bs";

function Sidebar(){
    return <>
        <section className="sidebar">
            <div className="logo-container">
                <h1><BsCartDashFill/></h1>
            </div>
            <Category/>
            <Price/>
            <Color/>
        </section>
    </>
}
export default Sidebar;