import React, { useState } from 'react';
import { RiSendPlaneLine } from 'react-icons/ri';
import { BiBot } from 'react-icons/bi';
import { AiOutlineGlobal } from 'react-icons/ai';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { ImSwitch } from 'react-icons/im';
import AddQuestion from './AddQuestion';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';

function Sidebar({ setActiveComponent }) {
    const { loggedInUser, logOut } = useUserAuth();
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('Community');
    const [open, setOpen] = useState(false);

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
        <div className="hidden lg:block bg-color2 w-60 min-h-screen px-4 pt-8 pb-6">
            <div className="fixed flex flex-col space-y-2 cursor-pointer text-gray-500">
                <span
                    className={`${activeButton === 'Community' ? 'bg-color3 text-color1' : ''
                        } rounded px-4 py-2 flex items-center space-x-2 text-xl border hover:border-color3`}
                    onClick={() => handleClick('Community')}
                >
                    <AiOutlineGlobal className="text-xl" />
                    <span>Community</span>
                </span>
                <span
                    className={`${activeButton === 'My Questions' ? 'bg-color3 text-color1' : ''
                        } rounded px-4 py-2 flex items-center space-x-2 text-xl border hover:border-color3`}
                    onClick={() => handleClick('My Questions')}
                >
                    <HiOutlinePencilAlt className="" />
                    <span>My Questions</span>
                </span>
                <span
                    className={`${activeButton === 'Profile' ? 'bg-color3 text-color1' : ''
                        } rounded px-4 py-2 flex items-center space-x-2 text-xl border hover:border-color3`}
                    onClick={() => handleClick('Profile')}
                >
                    <CgProfile className="" />
                    <span>Profile</span>
                </span>
                <span
                    className={`${activeButton === 'AI' ? 'bg-color3 text-color1' : ''
                        } rounded px-4 py-2 flex items-center space-x-2 text-xl border hover:border-color3`}
                    onClick={() => handleClick('AI')}
                >
                    <BiBot className="" />
                    <span>AI</span>
                </span>

            </div>

            <div className="flex flex-col space-y-3 fixed bottom-10 left-6">
                <div className='h-[0.05rem] w-full bg-color1 mb-7'></div>
                <button
                    className="flex items-center space-x-2 px-2 py-2 text-xl rounded shadow text-gray-400 hover:text-color3  cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    <span>Ask a Question</span>
                    <RiSendPlaneLine className="" />
                </button>
                <span
                    className={"rounded px-4 py-2 flex items-center space-x-3 text-xl cursor-pointer shadow text-gray-400 hover:text-color3"}
                    onClick={(e) => handleLogOut(e)}
                >
                    <span>Logout</span>
                    <ImSwitch className="" />
                </span>
            </div>

            <AddQuestion open={open} setOpen={setOpen} />
        </div>
    );
}

export default Sidebar;
