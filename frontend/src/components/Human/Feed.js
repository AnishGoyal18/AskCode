import React, { useState } from 'react';
import { useQuestionContext } from '../../context/QuestionContext';
import InputBox from './InputBox';
import QuestionCard from './QuestionCard';

function Feed() {
    const { allQuestions, setAllQuestions } = useQuestionContext();
    const [isOldestFirst, setIsOldestFirst] = useState(false);
    const [showUnanswered, setShowUnanswered] = useState(false);
    const [activeButton, setActiveButton] = useState('allQuestions');

    const handleSortClick = () => {
        setIsOldestFirst(!isOldestFirst);
        setAllQuestions([...allQuestions].reverse());
    };

    const handleUnansweredClick = () => {
        setShowUnanswered(true);
        setActiveButton('unanswered');
    };

    const handleAllQuestionsClick = () => {
        setShowUnanswered(false);
        setActiveButton('allQuestions');
    };

    let questionsToRender = allQuestions;
    if (showUnanswered) {
        questionsToRender = allQuestions.filter(question => question.allAnswers.length === 0);
    }

    return (
        <>
            <div className='w-[80%] mr-5 ml-3 sm:ml-10 sm:mr-20 space-y-5'>
                <InputBox />
                <div className="flex justify-between items-center">
                    <span className='text-gray-600'>{questionsToRender.length + ' '} questions</span>
                    <div className='flex space-x-2 font-semibold'>
                        <button className={`border border-gray-600 text-sm rounded-md px-3 py-2 ${activeButton === 'allQuestions' ? 'bg-color3 text-color4' : 'text-gray-600'}`}
                            onClick={handleAllQuestionsClick}>
                            All Questions
                        </button>
                        <button className={`border border-gray-600 text-sm rounded-md px-3 py-2 ${activeButton === 'unanswered' ? 'bg-color3 text-color4' : 'text-gray-600'}`}
                            onClick={handleUnansweredClick}>
                            Unanswered
                        </button>
                        <button className="text-gray-600 border border-gray-600 text-sm rounded-md px-3 py-2"
                            onClick={handleSortClick}>
                            {isOldestFirst ? 'Newest ▼' : 'Oldest ▲'}
                        </button>
                    </div>
                </div>
                {
                    questionsToRender.map((question, index) => (<QuestionCard key={index} question={question} />))
                }
            </div>
        </>
    )
}

export default Feed;
