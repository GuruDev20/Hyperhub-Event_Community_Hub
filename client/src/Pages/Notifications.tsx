import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import '../Styles/Notifications.css'
export default function Notifications() {
    const exploreData = [
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
    ];
    return (
        <div className="notify-header">
            <div><Navbar/></div>
            <div className="notify-container">
                <div className="notify-left"></div>
                <div className="notify-mid">
                    {exploreData.map((item, index) => (
                        <div key={index}>
                            <div className="notify-box">
                                <div className="notify-user-content">
                                    <p className="notify-user-logo">{item.logo}</p>
                                    <p className="notify-user-name">{item.name}</p>
                                </div>
                                <div className="user-notify-content">
                                    <p className="notify-content">{item.content}</p>
                                </div>
                            </div>
                            {index < exploreData.length - 1 && <div className="divider-notify"></div>}
                        </div>
                    ))}
                </div>
                <div className="notify-right"></div>
            </div>
            <div><Footer/></div>
        </div>
    )
}
