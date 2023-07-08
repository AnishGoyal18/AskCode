import React, { useState } from 'react';
import AskQuestion from './AskQuestion';

function InputBox() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='w-[80%] mr-5 ml-3 mt-4 sm:ml-10 sm:mr-20 space-y-5'>
                <div className='flex items-center space-x-3 p-3 rounded bg-color2'>
                    <button className='flex items-start px-4 py-2 w-[95%] rounded-3xl text-color4 bg-color1 font-roboto'
                        onClick={() => setOpen(!open)}>Ask me anything..
                    </button>
                </div>
                <AskQuestion open={open} setOpen={setOpen} />
            </div>

        </>
    )
}

export default InputBox;