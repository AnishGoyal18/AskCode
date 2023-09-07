import React, { useState } from 'react';
import { RiSendPlaneLine } from 'react-icons/ri';
import { BiBot } from 'react-icons/bi';
import { AiOutlineGlobal } from 'react-icons/ai';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import AddQuestion from './AddQuestion';

function Sidebar({ setActiveComponent }) {
    const [activeButton, setActiveButton] = useState('Community');
    const [open, setOpen] = useState(false);

    const handleClick = (component) => {
        setActiveButton(component);
        setActiveComponent(component);
    };

    return (
        <div className="hidden lg:block bg-color2 w-60 min-h-screen px-4 pt-8 pb-6">
            <div className="flex flex-col space-y-3 text-gray-300 cursor-pointer">
                <div className="flex flex-col space-y-2 fixed">
                    <span
                        className={`${activeButton === 'Community' ? 'bg-color1' : ''
                            } rounded px-4 py-2 flex items-center space-x-2 text-xl hover:bg-color1`}
                        onClick={() => handleClick('Community')}
                    >
                        <AiOutlineGlobal className="text-color3 text-xl" />
                        <span>Community</span>
                    </span>
                    <span
                        className={`${activeButton === 'My Questions' ? 'bg-color1' : ''
                            } rounded px-4 py-2 flex items-center space-x-2 text-xl hover:bg-color1`}
                        onClick={() => handleClick('My Questions')}
                    >
                        <HiOutlinePencilAlt className="text-color3" />
                        <span>My Questions</span>
                    </span>
                    <span
                        className={`${activeButton === 'Profile' ? 'bg-color1' : ''
                            } rounded px-4 py-2 flex items-center space-x-2 text-xl hover:bg-color1`}
                        onClick={() => handleClick('Profile')}
                    >
                        <CgProfile className="text-color3" />
                        <span>Profile</span>
                    </span>
                    <span
                        className={`${activeButton === 'AI' ? 'bg-color1' : ''
                            } rounded px-4 py-2 flex items-center space-x-2 text-xl hover:bg-color1`}
                        onClick={() => handleClick('AI')}
                    >
                        <BiBot className="text-color3" />
                        <span>AI</span>
                    </span>
                </div>

                <div className="fixed bottom-10 left-6">
                    <button
                        className="flex items-center space-x-2 px-2 py-2 text-lg font-semibold rounded shadow text-gray-400 bg-color1 hover:text-color3  cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <span>Ask a Question</span>
                        <RiSendPlaneLine className="text-color3 " />
                    </button>
                </div>

                <AddQuestion open={open} setOpen={setOpen} />
            </div>
        </div>
    );
}

export default Sidebar;
