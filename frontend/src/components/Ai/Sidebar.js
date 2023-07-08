import React, { useState } from 'react';
import { BiBot } from 'react-icons/bi';
import { AiOutlineGlobal } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

function Sidebar({ setActiveComponent }) {
    const [activeButton, setActiveButton] = useState('AI');

    const handleClick = (component) => {
        setActiveButton(component);
        setActiveComponent(component);
    };

    return (
        <div className="bg-color2 w-60 min-h-screen px-4 pt-8 pb-6">
            <div className="flex flex-col space-y-3 text-gray-300 cursor-pointer fixed">
                <button
                    className={`${activeButton === 'AI' ? 'bg-color1' : ''
                        } rounded px-4 py-2 flex items-center space-x-2 text-xl hover:bg-color1`}
                    onClick={() => handleClick('AI')}
                >
                    <BiBot className="text-color3" />
                    <span>AI</span>
                </button>
                <button
                    className={`${activeButton === 'Profile' ? 'bg-color1' : ''
                        } rounded px-4 py-2 flex items-center space-x-2 text-xl hover:bg-color1`}
                    onClick={() => handleClick('Profile')}
                >
                    <CgProfile className="text-color3" />
                    <span>Profile</span>
                </button>
                <button
                    className={`${activeButton === 'Ask Human' ? 'bg-color1' : ''
                        } rounded px-4 py-2 flex items-center space-x-2 text-xl hover:bg-color1`}
                    onClick={() => handleClick('Ask Human')}
                >
                    <AiOutlineGlobal className="text-color3" />
                    <span>Community</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
