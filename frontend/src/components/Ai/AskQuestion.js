import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';
import axios from 'axios';

function AskQuestion({ open, setOpen }) {
    const [chat, setChat] = useState([
        { type: 'answer', content: 'Type your question in the box above and click "Ask now" to get an answer.' },
    ]);
    const [question, setQuestion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (question !== "") {
            setChat(prevChat => [
                ...prevChat,
                { type: 'question', content: question }
            ]);

            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ask`, { prompt: question });

                setChat(prevChat => [
                    ...prevChat,
                    { type: 'answer', content: response.data }
                ]);
            } catch (error) {
                console.log(error);

                setChat(prevChat => [
                    ...prevChat,
                    { type: 'answer', content: 'Something went wrong...' }
                ]);
            }

            setQuestion('');
            setOpen(!open);
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(!open)}
                styles={{
                    overlay: {
                        backgroundColor: ''
                    },
                    modal: {
                        backgroundColor: '#262a2b',
                        maxWidth: '500px',
                        width: '100%'
                    }
                }}
                animationDuration={10}
                center
            >
                <div className='flex flex-col h-[70vh] p-3 space-y-5 justify-between'>
                    <div className='flex flex-col space-y-5 text-color4'>
                        <div className='flex items-center space-x-2 mb-5'>
                            <FaUserCircle className='text-color1 rounded-3xl shadow-md text-4xl' />
                            <div className='flex items-center space-x-2 px-3 py-1 shadow-lg rounded-3xl text-color3 bg-color1'>
                                <FiUsers className='text-xl' />
                                <span>Public</span>
                            </div>
                        </div>
                        <ReactQuill
                            theme="snow"
                            value={question}
                            onChange={(value) => setQuestion(value)}
                        />
                    </div>
                    <div className='flex flex-col space-y-2 sticky -left-40 -bottom-5 bg-color2'>
                        <div className='h-[0.05rem] w-full bg-color4'></div>
                        <div className='flex space-x-2 items-center justify-end'>
                            <button className='text-color4 hover:text-gray-600 mb-2' onClick={() => setOpen(!open)}>Cancel</button>
                            <button
                                onClick={handleSubmit}
                                className='px-4 py-2 text-sm font-semibold rounded-3xl mb-2
                        shadow text-color4 bg-color3 hover:text-color1'>Ask now</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className='flex flex-col space-y-3'>
                {chat.map((item, index) => {
                    if (item.type === 'question') {
                        return <QuestionCard key={index} question={item.content} />;
                    } else {
                        return <AnswerCard key={index} answer={item.content} />;
                    }
                })}
            </div>
        </>
    )
}

export default AskQuestion;