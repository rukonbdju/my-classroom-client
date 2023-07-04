import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/Auth/useAuth';
import Navbar from '../Navbar/Navbar';

const ResetPassword = () => {
    const { resetPassword, sendResetMail, errorMessage } = useAuth()
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const email = e.target.email.value;
            await resetPassword(email);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center bg-indigo-200'>
            <Navbar></Navbar>
            <div className='w-11/12 md:w-3/5 lg:w-1/4'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl text-center mb-8 
                bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500'>Reset Password</h1>
                <form onSubmit={handleResetPassword}>
                    <input
                        required
                        className='p-2 w-full block border rounded-lg outline-indigo-700'
                        placeholder='Enter email'
                        type="email"
                        name="email"
                        id="email" />
                    <button
                        className='uppercase w-full  p-2 bg-slate-300 text-white font-bold rounded-lg block my-4 
                    bg-gradient-to-r from-sky-500 to-indigo-500' type="submit">sent mail</button>
                </form>
                {sendResetMail && <span className='text-orange-500'>Please check your email or spam.</span>}
                {(errorMessage === 'Firebase: Error (auth/invalid-email).') && <span className='text-red-500'>
                    Please enter a valid email.</span>}
                {(errorMessage === 'Firebase: Error (auth/user-not-found).') &&<span className='text-red-500'>
                    No account found with this email address.</span>}
            </div>
        </div>
    );
};

export default ResetPassword;