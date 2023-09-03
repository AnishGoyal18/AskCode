import React, { useState } from 'react';
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
                const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/questions/${_id}`, body, config);
                setOpenEdit(!openEdit);
                window.location.reload();
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
                        <div className='flex space-x-2 items-center text-color4'>
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
                    <div className='flex flex-col sticky -left-40 -bottom-5 bg-color2'>
                        <div className='h-[0.05rem] w-full bg-color4'></div>
                        <div className='flex space-x-2 items-center justify-end py-3'>
                            <button className='text-color4 hover:text-gray-600' onClick={() => setOpenEdit(!openEdit)}>Cancel</button>
                            <button
                                onClick={handleSubmit}
                                className='px-4 py-2 text-sm font-semibold rounded-3xl shadow text-color4 bg-color3 hover:text-color1'>
                                Edit</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default EditQuestion;
