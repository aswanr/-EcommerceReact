import { FaGooglePlay } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa6";
import './footer.css' 

function Footer(){
return <>
<footer className="footer">
        <div className="footer-container">
            <div className="footer-column">
                <h3>Shop</h3>
                <ul>
                    <li><a href="/gift-guides">Gift Guides</a></li>
                    <li><a href="/gift-guides">Fan Art</a></li>
                    <li><a href="/gift-guides">New Works</a></li>
                    <li><a href="/gift-guides">Blog</a></li>
                    <li><a href="/gift-guides">Student Discount</a></li>
                    <li><a href="/gift-guides">Login</a></li>
                    <li><a href="/gift-guides">Signup</a></li>
                    <li><a href="/gift-guides">Bulk Orders</a></li>
                </ul>
            </div>

            <div className="footer-column">
                <h3>About</h3>
                <ul>
                    <li><a href="/gift-guides">About Us</a></li>
                    <li><a href="/gift-guides">Social Responsibility</a></li>
                    <li><a href="/gift-guides">Investor Center</a></li>
                    <li><a href="/gift-guides">Partner Program</a></li>
                    <li><a href="/gift-guides">Affiliates</a></li>
                    <li><a href="/gift-guides">Sell Your Art</a></li>
                    <li><a href="/gift-guides">Jobs</a></li>
                    <li><a href="/gift-guides">Artist Blog</a></li>
                </ul>
            </div>

            <div className="footer-column">
                <h3>Help</h3>
                <ul>
                    <li><a href="/gift-guides">Delivery</a></li>
                    <li><a href="/gift-guides">Returns</a></li>
                    <li><a href="/gift-guides">Help Center</a></li>
                    <li><a href="/gift-guides">Guidelines</a></li>
                    <li><a href="/gift-guides">Product Safety</a></li>
                    <li><a href="/gift-guides">Copyright</a></li>
                    <li><a href="/gift-guides">Contact Us</a></li>
                    <li><a href="/gift-guides">Cookie Settings</a></li>
                </ul>
            </div>

            <div className="footer-column social">
                <h3>Social</h3>
                <ul>
                    <li><a href="/gift-guides"><i className="fab fa-instagram"></i> Instagram</a></li>
                    <li><a href="/gift-guides"><i className="fab fa-facebook"></i> Facebook</a></li>
                    <li><a href="/gift-guides"><i className="fab fa-twitter"></i> Twitter</a></li>
                    <li><a href="/gift-guides"><i className="fab fa-tumblr"></i> Tumblr</a></li>
                    <li><a href="/gift-guides"><i className="fab fa-pinterest"></i> Pinterest</a></li>
                </ul>
            </div>
        </div>

        <div className="footer-bottom">
            <div className="footer-brand">  
                <h2>Shoppee</h2>
            </div>
            <div className="footer-links">
                <a href="/gift-guides">User Agreement</a>
                <a href="/gift-guides">Privacy Policy</a>
                <a href="/gift-guides">Cookie Policy</a>
            </div>
            <div className="app-buttons">
                <FaGooglePlay />
                <FaAppStoreIos />          
            </div>
        </div>
    </footer>
</>
}
export default Footer;