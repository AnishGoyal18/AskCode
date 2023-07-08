import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useUserAuth } from '../../context/UserAuthContext';

function AddAnswer({ open, setOpen, _id, createdAt }) {
    const [answer, setAnswer] = useState('');
    const { loggedInUser } = useUserAuth();

    const handleSubmit = async () => {
        if (_id && answer !== "") {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };

            const body = {
                answer: answer,
                questionId: _id,
                user: loggedInUser,
            };

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/answers`, body, config)
                .then((res) => {
                    setOpen(!open);
                    window.location.reload();
                })
                .catch((e) => {
                    console.log(e);
                });
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
                <div className='flex flex-col h-[70vh] px-3 space-y-5 justify-between'>
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
                            value={answer}
                            onChange={(value) => setAnswer(value)}
                        />
                    </div>
                    <div className='flex flex-col sticky -left-40 -bottom-5 bg-color2'>
                        <div className='h-[0.05rem] w-full bg-color4'></div>
                        <div className='flex space-x-2 items-center justify-end py-3'>
                            <button className='text-color4 hover:text-gray-600' onClick={() => setOpen(!open)}>Cancel</button>
                            <button
                                onClick={handleSubmit}
                                className='px-4 py-2 text-sm font-semibold rounded-3xl shadow text-color4 bg-color3 hover:text-color1'>
                                Answer</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AddAnswer;