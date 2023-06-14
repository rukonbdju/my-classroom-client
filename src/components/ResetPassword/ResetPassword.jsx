import React from 'react';
import useAuth from '../../hooks/Auth/useAuth';

const ResetPassword = () => {
    const { resetPassword,sendResetMail, errorMessage } = useAuth()
    console.log(errorMessage)
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const email = e.target.email.value;
            await resetPassword(email);
        } catch {
            err => console.log(err);
        }
    }
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center'>
            <div className='p-2 shadow-lg bg-slate-200 rounded-md'>
                <h1 className='text-2xl my-4'>Reset Password</h1>
                <form onSubmit={handleResetPassword}>
                    <input required className='p-2 w-full block border rounded-lg' placeholder='Enter email' type="email" name="email" id="email" />
                    <button className='uppercase p-2 bg-slate-300 rounded-lg block my-4 hover:bg-slate-400' type="submit">sent mail</button>
                </form>
            {sendResetMail&& <span className='text-orange-500'>Please check your email or spam.</span>}
            {errorMessage&& <span className='text-orange-500'>Something went wrong, try again.</span>}
            </div>
        </div>
    );
};

export default ResetPassword;