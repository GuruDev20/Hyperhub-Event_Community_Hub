import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../Styles/LeaderBoard.css';
import { BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';
import { LiaMedalSolid } from "react-icons/lia";
import { GoPersonAdd } from "react-icons/go";
interface Performer {
    name: string;
    score: number;
}

const performers: Performer[] = [
    { name: 'Alice', score: 90 },
    { name: 'Dev(You)', score: 75 },
    { name: 'Eve', score: 65 },
    { name: 'Charlie', score: 80 },
    { name: 'Bob', score: 85 },
    { name: 'Frank', score: 60 },
    { name: 'David', score: 70 },
];

const top3Performers = [...performers].sort((a, b) => b.score - a.score).slice(0, 5);

const topPerformers=performers;


export default function LeaderBoard() {
    return (
        <div className='leader-container'>
            <div><Navbar /></div>
            <div className="leader-board">
                <div className="leader-left"></div>
                <div className="leader-mid">
                    <div className="leader-top">
                        <div className="leader-stats">
                        <p className="leader-title">LeaderBoard</p>
                        <BarChart width={500} height={300} data={performers} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="score">
                                {performers.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.name === 'Dev(You)' ? '#ffc4d1' : '#6096ba'} />
                                ))}
                            </Bar>
                        </BarChart>
                        </div>
                        <div className="leader-top3">
                            <p className="top3">Top 3 Performers</p>
                            {top3Performers.map((performer, index) => (
                                <div key={index} className='top-results'>
                                    <div className="result-head">
                                        <p>{performer.name}</p>
                                        <div className="result-opt">
                                            <p>{performer.score}</p>
                                            <LiaMedalSolid size={20}/>
                                            <button className="top-add-friend"><GoPersonAdd color='white' className='add-leader' size={20}/></button>
                                        </div>
                                    </div>
                                    <>
                                        {index < top3Performers.length-1 && <div className="divider-cal"></div>}
                                    </>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="leader-bottom">
                        <p className="top-leader">Top Performers</p>
                        {topPerformers.map((performer, index) => (
                            <p key={index}>{performer.name}: {performer.score}</p>
                        ))}
                    </div>
                </div>
                <div className="leader-right"></div>
            </div>
            <div><Footer /></div>
        </div>
    );
}