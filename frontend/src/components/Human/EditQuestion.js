import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useUserAuth } from '../../context/UserAuthContext';

function EditQuestion({ question, openEdit, setOpenEdit }) {
    const { _id, questionTitle, questionDesc } = question;
    const [newQuestionTitle, setNewQuestionTitle] = useState(questionTitle);
    const [newQuestionDesc, setNewQuestionDesc] = useState(questionDesc);
    const { loggedInUser } = useUserAuth();

    useEffect(() => {
        setNewQuestionTitle(questionTitle);
        setNewQuestionDesc(questionDesc);
    }, [questionTitle, questionDesc]);

    const handleSubmit = async () => {
        if (newQuestionTitle !== "") {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };

            const body = {
                questionTitle: newQuestionTitle,
                questionDesc: newQuestionDesc,
                user: loggedInUser,
            };

            try {
                await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/questions/${_id}`, body, config);
                setOpenEdit(!openEdit);
            } catch (error) {
                console.log(error);
            }
        }
    };


    return (
        <>
            <Modal
                open={openEdit}
                onClose={() => setOpenEdit(!openEdit)}
                styles={{
                    overlay: {
                        backgroundColor: ''
                    },
                    modal: {
                        backgroundColor: '#E0E0E0',
                        maxWidth: '500px',
                        width: '100%'
                    }
                }}
                animationDuration={10}
                center
            >
                <div className='flex flex-col h-[70vh] p-3 space-y-5 justify-between'>
                    <div className='flex flex-col space-y-5 text-gray-500'>
                        <div className='flex items-center space-x-2 mb-5'>
                            <FaUserCircle className='text-gray-500 rounded-3xl shadow-md text-4xl' />
                            <div className='flex items-center space-x-2 px-3 py-1 shadow-lg rounded-3xl '>
                                <FiUsers className='text-xl' />
                                <span>Public</span>
                            </div>
                        </div>
                        <div className='flex space-x-2 items-center'>
                            <span className='tracking-wider'>Title</span>
                            <input
                                value={newQuestionTitle}
                                onChange={(e) => setNewQuestionTitle(e.target.value)}
                                className='sm:w-[33rem] px-4 py-2 rounded bg-color2 border-[0.0001rem]'>
                            </input>
                        </div>
                        <ReactQuill
                            theme="snow"
                            value={newQuestionDesc}
                            onChange={(value) => setNewQuestionDesc(value)}
                        />
                    </div>
                    <div className='flex space-x-2 items-center justify-end sticky -left-40 -bottom-5 bg-color2 rounded-b-lg p-3 border-t border-color3'>
                        <button className='text-color4 hover:text-gray-600' onClick={() => setOpenEdit(!openEdit)}>Cancel</button>
                        <button
                            onClick={handleSubmit}
                            className='px-4 py-2 text-sm font-semibold rounded-3xl shadow text-color2 bg-color3 hover:bg-color4'>
                            Edit</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default EditQuestion;
