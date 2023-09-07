import React, { useState, useEffect } from 'react';
import { useQuestionContext } from '../../context/QuestionContext';
import ReactLoading from 'react-loading';
import InputBox from './InputBox';
import QuestionCard from './QuestionCard';
import RightSidebar from './RightSidebar';

function Feed() {
    const { allQuestions } = useQuestionContext();
    const [questionsToRender, setQuestionsToRender] = useState([...allQuestions.reverse()]);
    const [isOldestFirst, setIsOldestFirst] = useState(false);
    const [showUnanswered, setShowUnanswered] = useState(false);
    const [activeButton, setActiveButton] = useState('allQuestions');

    const [searchText, setSearchText] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const tags = ['javascript', 'c++', 'python', 'git', 'react', 'cloud', 'node', 'mongodb', 'sql', 'angular', 'android', 'typescript', 'flutter', 'swift', 'ios'];

    const handleSearchChange = (event) => {
        const val = event.target.value;
        setSearchText(val);
        setSelectedTag('');

        if (val === '') {
            setQuestionsToRender(allQuestions);
        } else {
            setQuestionsToRender(allQuestions.filter(question =>
                question.questionTitle.toLowerCase().includes(val.toLowerCase())
            ));
            setActiveButton('allQuestions');
        }
    };

    const handleTagClick = (tag) => {
        setSearchText('');
        if (selectedTag === tag) {
            setSelectedTag('');
            setQuestionsToRender(allQuestions);
        } else {
            setSelectedTag(tag);
            setQuestionsToRender(allQuestions.filter(question =>
                question.questionTitle.toLowerCase().includes(tag.toLowerCase())
            ));
            setActiveButton('allQuestions');
        }
    };

    const handleSortClick = () => {
        setIsOldestFirst(!isOldestFirst);
        setQuestionsToRender([...questionsToRender].reverse());
    };

    const handleUnansweredClick = () => {
        setShowUnanswered(true);
        setActiveButton('unanswered');
    };

    const handleAllQuestionsClick = () => {
        setShowUnanswered(false);
        setActiveButton('allQuestions');
        setSearchText('');
        setSelectedTag('');
    };

    useEffect(() => {
        if (showUnanswered) {
            setQuestionsToRender(allQuestions.filter(question => question.allAnswers.length === 0));
        } else {
            setQuestionsToRender(allQuestions);
        }
    }, [allQuestions, showUnanswered]);

    return (
        <>
            <div className='flex w-[90vw] sm:w-[85%] space-x-5'>
                <div className='sm:w-[85%] space-y-5'>
                    <InputBox />
                    <div className="flex justify-between items-center mx-5">
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
                <RightSidebar
                    searchText={searchText}
                    selectedTag={selectedTag}
                    tags={tags}
                    handleSearchChange={handleSearchChange}
                    handleTagClick={handleTagClick}
                />
            </div>
        </>
    )
}

export default Feed;
