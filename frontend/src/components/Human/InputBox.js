import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { RiSendPlaneLine } from 'react-icons/ri';
import AddQuestion from './AddQuestion';
import { useUserAuth } from '../../context/UserAuthContext';

function InputBox() {
    const [open, setOpen] = useState(false);
    const { loggedInUser } = useUserAuth();

    return (
        <>
            <div className='flex items-center space-x-3 mx-5 p-3 rounded bg-color2'>
                <button
                    className="flex w-full justify-center items-center space-x-2 tracking-widest p-2 text-xl font-semibold
                     rounded text-gray-500 hover:text-color3 bg-color1 cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    <span>Ask a Question</span>
                    <RiSendPlaneLine className="text-color3 " />
                </button>
                <AddQuestion open={open} setOpen={setOpen} />
            </div>
        </>
    )
}

export default InputBox;