import '../Styles/Footer.css'
import { SiHubspot } from "react-icons/si";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
export default function Footer() {
    return (
        <div className="footer-header">
            <div className="footer-head">
                <SiHubspot size={34} className='footer-logo'/>
                <p className="foot-titles">Hyperhub</p>
            </div>
            <div className="footer-body">
                <div className="footer-left">
                    <p className="foot-title">Contact Us</p>
                    <div className="contact-content">
                        <p className="foot-text">Email: 0zjvC@example.com</p>
                        <p className="foot-text">Phone: 123-456-7890</p>
                        <p className="foot-text">Address: 123 Main St, Anytown, USA</p>
                        <p className="foot-text">Website: www.hyperhub.com</p>
                    </div>
                </div>
                <div className="footer-divider1"></div>
                <div className="footer-mid">Events | Organize | Explore | Leaderboard | Community</div>
                <div className="footer-divider2"></div>
                <div className="footer-right">
                    <p className="foot-title">Socials</p>
                    <div className="socials">
                        <p className="social"><FaFacebook size={34} /></p>
                        <p className="social"><FaSquareTwitter size={34}/></p>
                        <p className="social"><FaInstagram  size={34}/></p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">Copyright &copy; 2023 Hyperhub. All rights reserved.</div>
        </div>
    )
}
