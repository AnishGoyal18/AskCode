import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { TiTickOutline } from 'react-icons/ti';
import { MdDeleteOutline } from 'react-icons/md';
import TimeAgo from 'react-timeago';
import ReactHTmlParser from 'html-react-parser';
import axios from 'axios';
import { useUserAuth } from '../../context/UserAuthContext';

function AnswerCard({ ans }) {
    const { _id, answer, createdAt, user } = ans;
    const [isDeleting, setIsDeleting] = useState(false);
    const { loggedInUser } = useUserAuth();

    const handleDeleteAnswer = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/answers/${_id}`, config);
        } catch (error) {
            console.log(error);
        }
    };


    function handleDeleteClick() {
        if (isDeleting) {
            handleDeleteAnswer();
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
            <div className={'pb-3 pr-3 mt-4 ml-14 border-b-2 border-color3 shadow-sm shadow-color3 rounded-lg text-color4'}>
                <div className='flex flex-col space-y-2'>
                    <div className='flex space-x-4 space-y-2'>
                        <Avatar name={user?.email} color='gray' size="30" textSizeRatio={2} round={true} className='m-1 mt-2 p-1' />
                        <div className='flex flex-col space-y-2 w-full my-3 tracking-wide'>
                            <div className='flex justify-between mt-1'>
                                <div className='flex flex-col space-y-1'>
                                    <span className='text-color3 marker:font-semibold capitalize'>{user?.email.split('@')[0]}</span>
                                    <span className='flex items-center text-[0.6rem] text-gray-500 font-semibold'>
                                        Answered: &nbsp;
                                        <span className='flex items-center text-color3'>
                                            <TimeAgo date={createdAt} /> &nbsp;
                                            <AiOutlineFieldTime />
                                        </span>
                                    </span>
                                </div>
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
                            <div className={'break-all text-gray-300 pr-8'}>{ReactHTmlParser(answer)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnswerCard;
