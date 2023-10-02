import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Navbar from '../components/Navbar';
import InputBox from '../components/Ai/InputBox';
import Profile from '../components/Profile';
import Sidebar from '../components/Ai/Sidebar';
import { useNavigate } from "react-router-dom";

function AskAiPage() {
    const [activeComponent, setActiveComponent] = useState('AI');
    const navigate = useNavigate();

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'AI': return <InputBox />;
            case 'Profile': return <Profile />
            case 'Ask Human':
                navigate("/community");
                return;
            default: return null;
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    }, [activeComponent]);

    return (
        <>
            <div className='flex flex-col bg-color1'>
                <Navbar />
                <div className='flex'>
                    <Sidebar setActiveComponent={setActiveComponent} />
                    {renderActiveComponent()}
                </div>
            </div>
        </>
    )
}

export default AskAiPage;