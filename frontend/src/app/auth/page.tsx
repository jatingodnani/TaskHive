'use client';
import { useState } from 'react';
import SignInForm from '../../components/Sign-in';
import SignUpForm from '../../components/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#AFA3FF]">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 border-2">
                <h1 className='text-center font-bold text-2xl mb-6 tighter-wide'>Welcome To <span className='text-purple-700'>TaskHive</span></h1>

                {isSignIn ? <SignInForm /> : <SignUpForm />}
                <p className="mt-4 text-center">
                    {isSignIn ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
                    <button
                        onClick={toggleForm}
                        className="text-purple-700 underline"
                    >
                        {isSignIn ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Auth;
