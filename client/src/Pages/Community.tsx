import { useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { MdOutlineExplore, MdOutlineAddLocationAlt } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import '../Styles/Community.css';
import { GoPaperclip } from "react-icons/go";
import { PiTelegramLogo } from "react-icons/pi";
export default function Community() {
    const [mode, setMode] = useState<'chats' | 'groups'>('chats');

    const members = [
        { profile: "D", name: "Dev" },
        { profile: "D", name: "Dev" },
        { profile: "D", name: "Dev" },
        { profile: "D", name: "Dev" },
        { profile: "D", name: "Dev" },
        { profile: "D", name: "Dev" },
        { profile: "D", name: "Dev" },
        { profile: "D", name: "Dev" },
        { profile: "D", name: "Dev" },
        { profile: "G", name: "Guru" },
        { profile: "G", name: "Guru" },
        { profile: "G", name: "Guru" },
        { profile: "G", name: "Guru" },
    ];

    return (
        <div className="community-header">
            <div><Navbar /></div>
            <div className="community-body">
                <div className="community-body-left"></div>
                <div className="community-body-mid">
                    <div className="community-mid-left">
                        <p className="community-title">Community</p>
                        <div className="community-header-content">
                            <div className="community-subtitle">
                                <p className="com-sub-title">Explore</p>
                                <MdOutlineExplore size={24} />
                            </div>
                            <div className="community-create">
                                <p className="com-create-title">New</p>
                                <MdOutlineAddLocationAlt size={24} />
                            </div>
                        </div>
                        <p className="community-search">
                            <input type="search" name="community" id="community" className="search-community" placeholder='Search Community' />
                        </p>
                        <div className="community-filter-search-results">
                            <div className="toggle-chatsOrGroups">
                                <p className={`toggle-option ${mode === 'chats' ? 'active' : ''}`}onClick={() => setMode('chats')}>Chats</p>
                                <p className={`toggle-option ${mode === 'groups' ? 'active' : ''}`}onClick={() => setMode('groups')}>Groups</p>
                            </div>
                            <div className="toggle-border" style={{ left: mode === 'chats' ? '0%' : '50%' }}></div>
                                {members
                                    .filter(member => mode === 'chats' ? member.name.startsWith('D') : member.name.startsWith('G'))
                                    .map((member, index) => (
                                        <div key={index} className="community-search-results">
                                            <div className="community-profile">{member.profile}</div>
                                            <div className="community-name">{member.name}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="community-mid-right">
                            <div className="vertical-com-border"></div>
                            <div className='community-profile-contents'>
                                <div className="community-description">
                                    <div className='community-profile-content'>
                                        <div className="community-logo">D</div>
                                        <div className="community-name">Dev</div>
                                    </div>
                                    <div className="community-opt">
                                        <div className="community-leave"><IoArrowBack size={24}/></div>
                                        <div className="community-close"><IoClose size={24}/></div>
                                    </div>
                                </div>
                                <div className="community-content">
                                    <div className="content-body"></div>
                                    <div className="content-send-body">
                                        <div className="content-add-files"><GoPaperclip size={24}/></div>
                                        <div className="content-add-text">
                                            <input type="text" name="send" id="send" className="send-msg" placeholder='Type a Message' />
                                        </div>
                                        <div className="content-send"><PiTelegramLogo size={24}/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="community-body-right"></div>
                </div>
            <div><Footer /></div>
        </div>
    );
}
