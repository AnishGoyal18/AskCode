import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Navbar from '../components/Navbar';
import InputBox from '../components/Ai/InputBox';
import Profile from '../components/Profile';
import Sidebar from '../components/Ai/Sidebar';
import { useNavigate } from "react-router-dom";

function AskAiPage() {
    const [loading, setLoading] = useState(true);
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

        setTimeout(() => {
            setLoading(false);
        }, 600);
    }, [activeComponent]);

    return (
        <>
            <div className='flex flex-col bg-color1'>
                <Navbar />
                <div className='flex'>
                    <Sidebar setActiveComponent={setActiveComponent} />
                    {
                        loading
                            ?
                            <div className='flex w-[90vw] justify-center items-center'>
                                <ReactLoading type='bars' color='gray' />
                            </div>
                            :
                            renderActiveComponent()
                    }
                </div>
            </div>
        </>
    )
}

export default AskAiPage;