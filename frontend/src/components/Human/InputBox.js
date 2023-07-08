import React, { useState } from 'react';
import Avatar from 'react-avatar';
import AddQuestion from './AddQuestion';
import { useUserAuth } from '../../context/UserAuthContext';

function InputBox() {
    const [open, setOpen] = useState(false);
    const { loggedInUser } = useUserAuth();

    return (
        <>
            <div className='flex items-center space-x-3 mt-4 p-3 rounded bg-color2'>
                <Avatar name={loggedInUser?.email} color='gray' size="40" round={true} />
                <button className='flex items-start px-4 py-2 w-[95%] rounded-3xl text-color4 bg-color1'
                    onClick={() => setOpen(!open)}>What do you want to ask ?
                </button>
                <AddQuestion open={open} setOpen={setOpen} />
            </div>
        </>
    )
}

export default InputBox;