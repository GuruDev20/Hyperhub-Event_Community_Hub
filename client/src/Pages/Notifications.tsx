import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import '../Styles/Notifications.css'
export default function Notifications() {
    return (
        <div className="notify-header">
            <div><Navbar/></div>
            <div className="notify-container"></div>
            <div><Footer/></div>
        </div>
    )
}
