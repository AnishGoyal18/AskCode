import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { useQuestionContext } from '../../context/QuestionContext';
import InputBox from './InputBox';
import SkeletonCard from './SkeletonCard';
import QuestionCard from './QuestionCard';
import RightSidebar from './RightSidebar';

function Feed() {
    const { allQuestions } = useQuestionContext();
    const [loading, setLoading] = useState(true);
    const [questionsToRender, setQuestionsToRender] = useState(allQuestions);
    const [showUnanswered, setShowUnanswered] = useState(false);
    const [activeButton, setActiveButton] = useState('allQuestions');

    const [searchText, setSearchText] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const tags = ['javascript', 'c++', 'python', 'git', 'react', 'cloud', 'node', 'mongodb', 'sql', 'angular', 'android', 'typescript', 'flutter', 'swift', 'ios'];

    useEffect(() => {
        if (allQuestions.length > 0) {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setQuestionsToRender(allQuestions);
    }, [allQuestions.length]);

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

    const handleUnansweredClick = () => {
        setShowUnanswered(true);
        setActiveButton('unanswered');
    };

    const handleAllQuestionsClick = () => {
        setShowUnanswered(false);
        setActiveButton('allQuestions');
        setQuestionsToRender(allQuestions);
        setSearchText('');
        setSelectedTag('');
    };

    useEffect(() => {
        if (showUnanswered) {
            setQuestionsToRender(allQuestions.filter(question => question.allAnswers.length === 0));
        } else {
            setQuestionsToRender(allQuestions);
        }
    }, [showUnanswered]);

    return (
        <>
            <div className='flex justify-between w-[90%] sm:w-[100%] lg:w-[85%] space-x-5'>
                <div className='sm:w-[85%] space-y-5 my-5'>
                    <InputBox />
                    <div className="flex flex-col sm:flex-row justify-between space-y-3 items-center mx-5">
                        <div className='flex justify-between space-x-2 items-center font-semibold'>
                            <span className='text-gray-600'>{questionsToRender.length + ' '} questions</span>
                            <div className='flex space-x-2'>
                                <button className={`border border-gray-600 text-sm rounded-md px-3 py-2 ${activeButton === 'allQuestions' ? 'text-color1 bg-color3' : 'text-gray-600'}`}
                                    onClick={handleAllQuestionsClick}>
                                    All Questions
                                </button>
                                <button className={`border border-gray-600 text-sm rounded-md px-3 py-2 ${activeButton === 'unanswered' ? 'text-color1 bg-color3' : 'text-gray-600'}`}
                                    onClick={handleUnansweredClick}>
                                    Unanswered
                                </button>
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchText}
                            onChange={handleSearchChange}
                            className="border-none w-full sm:w-fit text-gray-300 bg-color2 text-sm rounded-md px-3 py-2"
                        />
                    </div>
                    {loading
                        ?
                        <>
                            {
                                new Array(20).fill(null).map(() => (<SkeletonCard />))
                            }
                        </>
                        :
                        <>
                            {
                                questionsToRender.map((question, index) => (<QuestionCard key={index} question={question} />))
                            }
                        </>
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
