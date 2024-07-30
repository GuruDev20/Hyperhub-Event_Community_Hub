import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import '../Styles/Explore.css'

export default function Explore() {
    const exploreData = [
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
        { logo: 'D', name: 'Dev', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, incidunt' },
    ];

    return (
        <div className='explore-section'>
            <div><Navbar /></div>
            <div className="explore-container">
                <div className="explore-left"></div>
                <div className="explore-mid">
                    {exploreData.map((item, index) => (
                        <div key={index}>
                            <div className="explore-box">
                                <div className="user-content">
                                    <p className="explore-user-logo">{item.logo}</p>
                                    <p className="explore-user-name">{item.name}</p>
                                </div>
                                <div className="user-explore-content">
                                    <p className="explore-content">{item.content}</p>
                                </div>
                            </div>
                            {index < exploreData.length - 1 && <div className="divider-explore"></div>}
                        </div>
                    ))}
                </div>
                <div className="explore-right"></div>
            </div>
            <div><Footer /></div>
        </div>
    )
}
