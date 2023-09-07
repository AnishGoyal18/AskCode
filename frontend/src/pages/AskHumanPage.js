import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Navbar from '../components/Navbar';
import Feed from '../components/Human/Feed';
import MyQuestions from '../components/Human/MyQuestions';
import Profile from '../components/Profile';
import Sidebar from '../components/Human/Sidebar';
import { useQuestionContext } from '../context/QuestionContext';
import { useNavigate } from "react-router-dom";

function AskHumanPage() {
    const [loading, setLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState('Community');
    const { allQuestions } = useQuestionContext();
    const navigate = useNavigate();

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'Community': return <Feed />;
            case 'My Questions': return <MyQuestions />;
            case 'Profile': return <Profile />
            case 'AI':
                navigate("/ai");
                return;
            default: return null;
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        if (allQuestions.length) setLoading(false);
    }, [activeComponent]);

    return (
        <>
            <div className='bg-color1 flex flex-col'>
                <Navbar />
                <div className='flex space-x-5'>
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

export default AskHumanPage;