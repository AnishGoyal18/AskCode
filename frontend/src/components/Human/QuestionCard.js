import React from 'react';
import Avatar from 'react-avatar';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { AiOutlineFieldTime } from 'react-icons/ai';
import TimeAgo from 'react-timeago';
import { useNavigate } from "react-router-dom";

function QuestionCard({ question }) {
    const { _id, questionTitle, questionDesc, createdAt, allAnswers, user } = question;
    const navigate = useNavigate();

    return (
        <>
            <div className='flex items-center space-x-4 sm:mx-5 px-6 py-4 border-l border-color3 rounded-lg bg-color2'>
                <Avatar name={user?.email} color='gray' size="40" round={true} textSizeRatio={2} className='' />
                <div className='flex flex-col space-y-3 w-full'>
                    <div
                        className='break-all capitalize font-semibold cursor-pointer text-color3 hover:underline'
                        onClick={() => navigate(`/community/${_id}`)}>
                        {questionTitle}
                    </div>
                    <div className='flex items-center mt-1'>
                        <div className='flex items-center space-x-1 text-xs text-gray-500 font-bold'>
                            <span>Created by:</span>
                            <span className='capitalize text-xs text-gray-500 font-bold'>{user?.email.split('@')[0]}</span>
                        </div>
                        <div className='border-r border-gray-500 mx-2 h-[60%]'></div>
                        <div className='flex items-center text-xs text-gray-500 font-bold'>
                            <AiOutlineFieldTime className='text-xl' />
                            <TimeAgo date={createdAt} /> &nbsp;
                        </div>
                        <div className='border-r border-gray-500 mx-2 h-[60%]'></div>
                        <div className={'flex items-center space-x-1 text-gray-500 cursor-pointer'}
                            onClick={() => navigate(`/community/${_id}`)}>
                            <RiQuestionAnswerLine className='text-xl' />
                            <span className='text-sm'>
                                Answers: {allAnswers.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionCard;
