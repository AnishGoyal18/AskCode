import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Navbar from '../components/Navbar';
import Feed from '../components/Human/Feed';
import DetailedQuestionCard from '../components/Human/DetailedQuestionCard';
import MyQuestions from '../components/Human/MyQuestions';
import Profile from '../components/Profile';
import Sidebar from '../components/Human/Sidebar';
import { useNavigate } from "react-router-dom";

function DetailedQuestionPage() {
    const [loading, setLoading] = useState(true);
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

        setTimeout(() => {
            setLoading(false);
        }, 600);
    }, [activeComponent]);

    return (
        <>
            <div className='bg-color1 flex flex-col'>
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

export default DetailedQuestionPage;