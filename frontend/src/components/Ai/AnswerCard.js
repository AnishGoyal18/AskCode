import React from 'react';
import AiImage from '../../images/ai.png';
import Typewriter from './Typewriter';

function AnswerCard({ answer }) {
    return (
        <>
            <div className='flex space-x-4 w-[100%] pr-4 pb-5 shadow shadow-color3 rounded-lg text-color4 bg-color2'>
                <img src={AiImage} alt="" className='h-10 mt-3 ml-2' />
                <div className='flex flex-col space-y-1 mt-3 tracking-wide flex-grow'>
                    <div className='flex justify-between space-x-8 mt-1'>
                        <span className='text-lg text-color3 font-semibold'>{'AI'}</span>
                    </div>
                    <div className='break-all font-semibold'>
                        <Typewriter answer={answer} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default AnswerCard;