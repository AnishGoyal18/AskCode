import React, { useState, useEffect } from 'react';
import { useQuestionContext } from '../../context/QuestionContext';
import QuestionCard from './QuestionCard';
import { useUserAuth } from '../../context/UserAuthContext';

function MyQuestions() {
    const { allQuestions } = useQuestionContext();
    const [myQuestions, setMyQuestions] = useState([]);
    const [isOldestFirst, setIsOldestFirst] = useState(false);
    const [showUnanswered, setShowUnanswered] = useState(false);
    const [activeButton, setActiveButton] = useState('allQuestions');
    const { loggedInUser } = useUserAuth();

    useEffect(() => {
        const filteredQuestions = allQuestions.reverse().filter(question => {
            return question.user?.uid === loggedInUser.uid;
        });
        setMyQuestions(filteredQuestions);
    }, [allQuestions, loggedInUser.uid]);

    const handleSortClick = () => {
        setIsOldestFirst(!isOldestFirst);
        setMyQuestions([...myQuestions].reverse());
    };

    const handleUnansweredClick = () => {
        setShowUnanswered(true);
        setActiveButton('unanswered');
    };

    const handleAllQuestionsClick = () => {
        setShowUnanswered(false);
        setActiveButton('allQuestions');
    };

    let questionsToRender = myQuestions;
    if (showUnanswered) {
        questionsToRender = myQuestions.filter(question => question.allAnswers.length === 0);
    }

    return (
        <>
            <div className='w-[80%] mr-5 ml-3 mt-4 sm:ml-10 sm:mr-20 space-y-5'>
                <div className="flex justify-between items-center">
                    <span className='text-gray-600'>{questionsToRender.length + ' '} questions</span>
                    <div className='flex space-x-2'>
                        <button className={`border border-gray-600 rounded-md text-sm px-3 py-2 ${activeButton === 'allQuestions' ? 'bg-color3 text-color4' : 'text-gray-600'}`}
                            onClick={handleAllQuestionsClick}>
                            All Questions
                        </button>
                        <button className={`border border-gray-600 rounded-md text-sm px-3 py-2 ${activeButton === 'unanswered' ? 'bg-color3 text-color4' : 'text-gray-600'}`}
                            onClick={handleUnansweredClick}>
                            Unanswered
                        </button>
                        <button className="text-gray-600 border border-gray-600 rounded-md text-sm px-3 py-2 ml-2"
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

export default MyQuestions;