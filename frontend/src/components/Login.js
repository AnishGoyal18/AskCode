import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import { useUserAuth } from '../context/UserAuthContext';

function Login() {
    const [email, setEmail] = useState('demo@gmail.com');
    const [password, setPassword] = useState('demo@gmail.com');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { logIn } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await logIn(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
                <div className="flex flex-col w-[90%] sm:w-auto space-y-5 justify-center items-center rounded shadow-2xl px-10 py-8 bg-white">
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
                                <button
                                    onClick={handleSubmit}
                                    className="mb-1.5 block w-full text-center text-white bg-slate-600 hover:bg-slate-700 px-2 py-1.5 rounded-md">
                                    LOGIN
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <span className="text-xs text-gray-400 font-semibold">Don't have account? </span>
                            <Link to={'/signup'} className="text-xs font-semibold text-gray-500">SIGN UP</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;