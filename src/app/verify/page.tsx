
"use client";

import OtpInput from '@/components/OtpInputNew';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

const Home: React.FC = () => {
    const len = 6;
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);

    const requestOtp = async () => {
        try {
            await axios.post('http://localhost:3000/otp/generate', { email });
            setMessage('OTP sent to your email.');
            setShow(true);
        } catch (error) {
            setMessage('Error sending OTP.');
        }
    };

    const verifyOtp = async (otp: string) => {
        try {
            const response = await axios.post('http://localhost:3000/otp/validate', { email, otp });
            if (response.data.isValid) {
                setMessage('OTP validated successfully.');

                setTimeout(() => {
                    setShow(false);
                }, 5000);
            } else {
                setMessage('Invalid OTP.');
            }
        } catch (error) {
            setMessage('Error validating OTP.');
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (value: string) => {
        setOtp(value);
        if (value.length >= len) {
            console.log('Otp changed' + value);
            console.log('Otp changed' + otp);
            verifyOtp(value);
        }
    };

    return (
        <div>

            {!show ?
                (
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
                            <button
                                className="!absolute right-1 top-1 z-10 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500"
                                type="button"
                                data-ripple-light="true"
                                onClick={requestOtp}
                            >
                                Request
                            </button>
                            <input
                                type="email"
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Email Address
                            </label>

                        </div>
                        {message}
                    </div>
                )
                : (
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h1 className="mb-4 text-2xl font-semibold text-center">Enter OTP</h1>
                            <OtpInput length={len} onChange={handleOtpChange} />
                            <p className="mt-4 text-center">{message}</p>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default Home;
