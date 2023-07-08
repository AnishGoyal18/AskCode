import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import { useUserAuth } from '../context/UserAuthContext';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signUp } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setError('');
            try {
                await signUp(email, password);
                setError('Registration Successful');
                navigate('/login');
            } catch (err) {
                setError(err.message);
            }
        }
        else {
            setError('Password does not match');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
                <div className="flex flex-col space-y-5 justify-center items-center rounded shadow-2xl px-10 py-8 bg-white">
                    <img src={logo} alt='logo' className='h-24 rounded-[50%] border-2 p-1' />
                    {error && <div>{error}</div>}
                    <div className="w-72">
                        <form className="mt-4">
                            <div className="mb-3">
                                <label className="mb-2 block text-xs font-semibold tracking-wide">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 py-1 px-1.5 text-gray-500"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-xs font-semibold tracking-wide">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 py-1 px-1.5 text-gray-500"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2 block text-xs font-semibold tracking-wide">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 py-1 px-1.5 text-gray-500"
                                />
                            </div>
                            <div className="mb-3">
                                <button
                                    onClick={handleSubmit}
                                    className="mb-1.5 block w-full text-center text-white bg-slate-600 hover:bg-slate-700 px-2 py-1.5 rounded-md">
                                    SIGN UP
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <span className="text-xs text-gray-400 font-semibold">Already have an account? </span>
                            <Link to={'/login'} className="text-xs font-semibold text-gray-500">LOGIN</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;


