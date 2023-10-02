import React, { useState } from 'react';
import { BiBot } from 'react-icons/bi';
import { AiOutlineGlobal } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { ImSwitch } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';

function Sidebar({ setActiveComponent }) {
    const { loggedInUser, logOut } = useUserAuth();
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('AI');

    const handleClick = (component) => {
        setActiveButton(component);
        setActiveComponent(component);
    };

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logOut();
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="hidden md:block bg-color2 w-60 min-h-screen px-4 pt-8 pb-6">
            <div className="flex flex-col space-y-3 text-gray-500 cursor-pointer fixed">
                <button
                    className={`${activeButton === 'AI' ? 'bg-color3 text-color1' : ''
                        } rounded px-4 py-2 flex items-center space-x-2 text-xl border hover:border-color3`}
                    onClick={() => handleClick('AI')}
                >
                    <BiBot className="" />
                    <span>AI</span>
                </button>
                <button
                    className={`${activeButton === 'Profile' ? 'bg-color3 text-color1' : ''
                        } rounded px-4 py-2 flex items-center space-x-2 text-xl border hover:border-color3`}
                    onClick={() => handleClick('Profile')}
                >
                    <CgProfile className="" />
                    <span>Profile</span>
                </button>
                <button
                    className={`${activeButton === 'Ask Human' ? 'bg-color3 text-color1' : ''
                        } rounded px-4 py-2 flex items-center space-x-2 text-xl border hover:border-color3`}
                    onClick={() => handleClick('Ask Human')}
                >
                    <AiOutlineGlobal className="" />
                    <span>Community</span>
                </button>
                <div className="flex flex-col fixed bottom-10 left-6">
                    <span
                        className={"w-40 rounded px-4 py-2 flex items-center space-x-3 text-xl cursor-pointer shadow text-gray-400 hover:text-color3"}
                        onClick={(e) => handleLogOut(e)}
                    >
                        <span>Logout</span>
                        <ImSwitch className="" />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
