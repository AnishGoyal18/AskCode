import React from 'react';
import UserImage from '../../images/user.png';
import ReactHTmlParser from 'html-react-parser';

function QuestionCard({ question }) {
    return (
        <>
            <div className='flex space-x-4 w-[100%] pr-4 pb-5 shadow shadow-color3 rounded-lg text-color4 bg-color2'>
                <img src={UserImage} alt="" className='h-10 mt-3 ml-2' />
                <div className='flex flex-col space-y-1 mt-3 tracking-wide flex-grow'>
                    <div className='flex justify-between space-x-8 mt-1'>
                        <span className='text-lg text-color3 font-semibold'>{'User'}</span>
                    </div>
                    <div className='break-all font-semibold'>{ReactHTmlParser(question)}</div>
                </div>
            </div>

        </>
    )
}

export default QuestionCard;