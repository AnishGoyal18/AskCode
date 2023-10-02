import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiCodenewbie } from 'react-icons/si';
import { ImSwitch } from 'react-icons/im';
import { useUserAuth } from '../context/UserAuthContext';

function HomeNavbar() {
    const navigate = useNavigate();
    const { loggedInUser, logOut } = useUserAuth();

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
        <>
            <div className='flex justify-between sticky top-0 overflow-hidden px-12 py-3 shadow-md bg-color2'>
                <div className='flex items-center text-color4 text-2xl cursor-pointer'
                    onClick={() => navigate('/')}>
                    <span className='text-gray-400'>Ask</span>
                    <span className='font-semibold text-color3'>Code</span>
                    <SiCodenewbie className='text-color3' />
                </div>
                {loggedInUser === null ?
                    <div className='flex items-center'>
                        <button
                            className='bg-color3 hover:bg-color4 text-color2 rounded-lg py-2 px-3 sm:px-5 mr-1 sm:mr-4'
                            onClick={() => navigate('/login')}
                        >
                            Log In
                        </button>
                        <button
                            className='border border-color3 text-color3 hover:text-color2 hover:bg-color3  rounded-lg py-2 px-3 sm:px-5'
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </button>
                    </div>
                    :
                    <div className='flex items-center space-x-28'>
                        <ImSwitch onClick={(e) => handleLogOut(e)} className='cursor-pointer text-xl text-color4' />
                    </div>
                }
            </div>
        </>
    );
}

export default HomeNavbar;
