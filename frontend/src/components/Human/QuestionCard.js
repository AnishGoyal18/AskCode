import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
import TimeAgo from 'react-timeago';
import AddAnswer from './AddAnswer';
import AnswerCard from './AnswerCard';
import ReactHTmlParser from 'html-react-parser';
import axios from 'axios';
import { useUserAuth } from '../../context/UserAuthContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function QuestionCard({ question }) {
    const { _id, questionTitle, questionDesc, createdAt, allAnswers, user } = question;
    const [open, setOpen] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isShrunk, setIsShrunk] = useState(true);
    const { loggedInUser } = useUserAuth();

    const handleDeleteQuestion = async (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/questions/${id}`, config)
            .then((res) => {
                window.location.reload();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    function handleDeleteClick() {
        if (isDeleting) {
            handleDeleteQuestion(question._id);
            setIsDeleting(false);
        } else {
            setIsDeleting(true);
        }
    }

    useEffect(() => {
        let timer;
        if (isDeleting) {
            timer = setTimeout(() => {
                setIsDeleting(false);
            }, 1500);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isDeleting]);

    return (
        <>
            <div className='w-[100%] max-w-[58.5rem] pr-4 pb-5 shadow-sm shadow-color3 rounded-lg text-color4 bg-color2'>
                <div className='flex flex-col space-x-4 space-y-6'>
                    <div className='flex flex-col'>
                        <div className='flex space-x-4'>
                            <Avatar name={user?.email} color='gray' size="40" round={true} textSizeRatio={2} className='m-1 mt-2 p-1' />
                            <div className='flex flex-col space-y-1 w-full mt-2 mb-6 tracking-wide'>
                                <div className='flex justify-between mt-1'>
                                    <div className='flex flex-col space-y-1'>
                                        <span className='text-lg text-color3 font-semibold capitalize'>{user?.email.split('@')[0]}</span>
                                        <span className='flex items-center text-xs text-gray-500 font-semibold'>
                                            Asked: &nbsp;
                                            <span className='flex items-center font-bold'>
                                                <TimeAgo date={createdAt} /> &nbsp;
                                                <AiOutlineFieldTime />
                                            </span>
                                        </span>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <div className={`text-center ${isShrunk ? 'block' : 'hidden'}`} onClick={() => setIsShrunk(false)}>
                                            <button className="text-gray-600 font-medium mb-2 hover:text-color3">
                                                <FaChevronDown />
                                            </button>
                                        </div>
                                        {!isShrunk &&
                                            <div className={`text-center ${!isShrunk ? 'block' : 'hidden'}`} onClick={() => setIsShrunk(true)}>
                                                <button className="text-gray-600 font-medium mb-2 hover:text-color3">
                                                    <FaChevronUp />
                                                </button>
                                            </div>
                                        }

                                        {user && loggedInUser && user.uid === loggedInUser.uid &&
                                            <button onClick={() => handleDeleteClick()}>
                                                {isDeleting ?
                                                    <TiTickOutline className='text-3xl' />
                                                    :
                                                    <MdDeleteOutline className='text-3xl' />
                                                }
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='break-all font-semibold ml-16'>{questionTitle}</div>
                    </div>
                    <div className='flex flex-col space-y-3'>
                        <div className={'break-all text-gray-300 tracking-wide pl-12 pr-6 overflow-x-scroll scrollbar-hide'}>
                            {
                                ReactHTmlParser(isShrunk && questionDesc.length > 200 ? questionDesc.slice(0, 200) + ' ...' : questionDesc)
                            }
                        </div>
                        <div className={`text-center ${isShrunk && questionDesc.length > 200 ? 'block' : 'hidden'}`} onClick={() => setIsShrunk(false)}>
                            <button className="flex space-x-1 pl-12 items-center text-gray-600 text-sm font-semibold hover:text-color3">
                                <span>Show More</span>
                                <FaChevronDown />
                            </button>
                        </div>
                        {!isShrunk &&
                            <div className={`text-center ${!isShrunk && questionDesc.length > 200 ? 'block' : 'hidden'}`} onClick={() => setIsShrunk(true)}>
                                <button className="flex space-x-1 pl-12 items-center text-gray-600 text-sm font-semibold hover:text-color3">
                                    <span>Show Less</span>
                                    <FaChevronUp />
                                </button>
                            </div>
                        }
                    </div>
                    <div className='flex items-center justify-between'>
                        <button className={`flex items-center space-x-2 px-3 py-1 shadow-sm ${showAnswers ? 'shadow-color3' : ''} rounded`} onClick={() => setShowAnswers(!showAnswers)}>
                            <RiQuestionAnswerLine className='text-2xl text-gray-300' />
                            <span className='text-sm text-color4'>
                                {allAnswers.length === 0 ? 'No' : allAnswers.length}&nbsp;
                                {allAnswers.length === 1 ? 'Answer' : 'Answers'}
                            </span>
                        </button>
                        <button className='flex items-center space-x-1 px-3 py-1 rounded 
                        shadow text-color4 font-semibold bg-color3 hover:text-color2' onClick={() => setOpen(!open)}>
                            <span>Answer</span>
                            <FaRegComment />
                        </button>
                        <AddAnswer open={open} setOpen={setOpen} _id={_id} createdAt={createdAt} />
                    </div>
                </div>
                {showAnswers &&
                    allAnswers.map((ans, index) => (<AnswerCard key={index} ans={ans} />))
                }
            </div>
        </>
    )
}

export default QuestionCard;