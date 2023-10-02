import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { ImSwitch } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { confirm } from "react-confirm-box";
import { useQuestionContext } from '../context/QuestionContext';
import { useUserAuth } from '../context/UserAuthContext';

function Profile() {
    const { allQuestions } = useQuestionContext();
    const [myQuestions, setMyQuestions] = useState([]);
    const navigate = useNavigate();
    const { loggedInUser, logOut } = useUserAuth();

    useEffect(() => {
        const filteredQuestions = allQuestions.reverse().filter(question => {
            return question.user?.uid === loggedInUser.uid;
        });
        setMyQuestions(filteredQuestions);
    }, [allQuestions, loggedInUser.uid]);

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logOut();
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }

    const confirmLogout = async (e) => {
        const result = await confirm("Are you sure to Logout?", {
            labels: {
                confirmable: "Yes",
                cancellable: "No"
            }
        });
        if (result) {
            handleLogOut(e);
            return;
        }
    }

    return (
        <div className="flex flex-col space-y-14 bg-color2 text-color4 w-[90%] sm:w-[60%] h-full px-5 py-8 mx-5 sm:ml-10 my-5 shadow-lg rounded-lg">
            <div className='flex flex-col space-y-5'>
                <div className="flex space-x-7 items-center">
                    <Avatar name={loggedInUser?.email} color='gray' size="80" round={false} textSizeRatio={2} className='p-2' />
                    <div>
                        <h1 className="text-2xl font-bold capitalize">{loggedInUser?.email.split("@")[0]}</h1>
                        <p>{loggedInUser?.email}</p>
                    </div>
                </div>
                <div className="flex mx-7 space-x-16">
                    <div className="flex flex-col items-center mr-4">
                        <span className="font-bold">0</span>
                        <span>Followers</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold">0</span>
                        <span>Following</span>
                    </div>
                </div>
                <div className="flex mx-7 space-x-16">
                    <div className="flex flex-col items-center mr-4">
                        <span className="font-bold">{myQuestions.length}</span>
                        <span>Questions</span>
                    </div>
                    <div className="flex flex-col items-center mr-4">
                        <span className="font-bold">0</span>
                        <span>Answers</span>
                    </div>
                </div>
            </div>
            <div>
                <button className="flex space-x-1 items-center mx-auto bg-color3 text-color1 font-bold py-2 px-4 rounded-lg shadow-md"
                    onClick={(e) => confirmLogout(e)}>
                    <span>Logout</span>
                    <ImSwitch />
                </button>
            </div>
        </div>
    );
}

export default Profile;
