import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DetailedQuestionCard from '../components/Human/DetailedQuestionCard';
import MyQuestions from '../components/Human/MyQuestions';
import Profile from '../components/Profile';
import Sidebar from '../components/Human/Sidebar';
import { useNavigate } from "react-router-dom";

function DetailedQuestionPage() {
    const [activeComponent, setActiveComponent] = useState('DetailedQuestion');
    const navigate = useNavigate();

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'Community': navigate('/community');
            case 'DetailedQuestion': return <DetailedQuestionCard />
            case 'My Questions':
                navigate('/community')
                return <MyQuestions />;
            case 'Profile':
                navigate('/community')
                return <Profile />
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
    }, [activeComponent]);

    return (
        <>
            <div className='bg-color1 flex flex-col'>
                <Navbar />
                <div className='flex'>
                    <Sidebar setActiveComponent={setActiveComponent} />
                    {renderActiveComponent()}
                </div>
            </div>
        </>
    )
}

export default DetailedQuestionPage;