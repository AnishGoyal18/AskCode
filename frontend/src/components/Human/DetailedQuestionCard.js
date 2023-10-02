import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { AiFillQqCircle, AiOutlineFieldTime } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
import { FaChevronDown, FaChevronUp, FaChevronLeft } from 'react-icons/fa';
import TimeAgo from 'react-timeago';
import EditQuestion from './EditQuestion';
import AddAnswer from './AddAnswer';
import AnswerCard from './AnswerCard';
import ReactHTmlParser from 'html-react-parser';
import axios from 'axios';
import { useUserAuth } from '../../context/UserAuthContext';
import { useQuestionContext } from '../../context/QuestionContext';
import { useParams, useNavigate } from "react-router-dom";

function DetailedQuestionCard() {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const { allQuestions } = useQuestionContext();
    const filtered = allQuestions.filter(q => q._id === questionId);
    const question = filtered[0];
    const { _id, questionTitle, questionDesc, createdAt, allAnswers, user } = question || {};

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [showAnswers, setShowAnswers] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isShrunk, setIsShrunk] = useState(false);
    const { loggedInUser } = useUserAuth();

    const handleDeleteQuestion = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/questions/${_id}`, config);
            navigate('/community');
        } catch (error) {
            console.log(error);
        }
    };

    function handleDeleteClick() {
        if (isDeleting) {
            handleDeleteQuestion();
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
            <div className='w-[100%] max-w-[58.5rem] h-fit p-4 m-8 mb-14 shadow-sm shadow-color3 rounded-lg text-color4 bg-color2'>
                <div className='flex flex-col space-x-4 space-y-6'>
                    <div className='flex flex-col'>
                        <div className='flex flex-col space-x-4'>
                            <div className='flex justify-between mx-4 my-2'>
                                <div className='flex space-x-4 text-gray-400'>
                                    <div className='flex items-center space-x-1 cursor-pointer'
                                        onClick={() => navigate('/community')}>
                                        <FaChevronLeft className='text-sm ' />
                                        <div>Back</div>
                                    </div>
                                    <div className='border-r border-gray-400'></div>
                                    <div className='break-all font-semibold text-lg'>{questionTitle}</div>
                                </div>
                                <div className='flex'>
                                    {user && loggedInUser && user.uid === loggedInUser.uid &&
                                        <>
                                            <button onClick={() => setOpenEdit(!openEdit)}>
                                                <FiEdit className='text-xl text-color3' />
                                            </button>
                                            <EditQuestion question={question} openEdit={openEdit} setOpenEdit={setOpenEdit} />
                                        </>
                                    }
                                    {user && loggedInUser && user.uid === loggedInUser.uid &&
                                        <button onClick={() => handleDeleteClick()}>
                                            {isDeleting ?
                                                <TiTickOutline className='text-2xl text-green-500' />
                                                :
                                                <MdDeleteOutline className='text-2xl text-red-500' />
                                            }
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className='border-b border-color1 my-2'></div>
                            <div className='flex justify-between mt-1'>
                                <div className='flex justify-center items-center space-x-2 space-y-1'>
                                    <Avatar name={user?.email} color='gray' size="40" round={true} textSizeRatio={2} className='' />
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-3'>
                        <div className={'break-all text-gray-400 pl-12 pr-6 overflow-x-scroll scrollbar-hide'}>
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
                    <button className={`flex items-center space-x-2 w-fit px-3 py-1 shadow-sm ${showAnswers ? 'shadow-color3' : ''} rounded`} onClick={() => setShowAnswers(!showAnswers)}>
                        <RiQuestionAnswerLine className='text-2xl text-gray-300' />
                        <span className='text-sm text-color4'>
                            {allAnswers.length === 0 ? 'No' : allAnswers.length}&nbsp;
                            {allAnswers.length === 1 ? 'Answer' : 'Answers'}
                        </span>
                    </button>
                    {showAnswers &&
                        allAnswers.map((ans, index) => (<AnswerCard key={index} ans={ans} />))
                    }
                    <button className='flex items-center space-x-1 w-fit px-3 py-1 rounded 
                        shadow font-semibold text-color1 bg-color3' onClick={() => setOpen(!open)}>
                        <span>Answer</span>
                        <FaRegComment />
                    </button>
                    <AddAnswer open={open} setOpen={setOpen} _id={_id} createdAt={createdAt} />
                </div>
            </div>
        </>
    )
}

export default DetailedQuestionCard;