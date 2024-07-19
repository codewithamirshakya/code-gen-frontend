import React, { ChangeEvent, ClipboardEvent, KeyboardEvent, useRef, useState } from 'react';

interface OtpInputProps {
    length?: number;
    onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = event.target.value.replace(/[^0-9]/g, ''); // Ensure only digits
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }

        onChange(newOtp.join(''));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const paste = event.clipboardData.getData('text');
        const pasteArray = paste.split('').slice(0, length);
        setOtp(pasteArray);
        pasteArray.forEach((char, index) => {
            if (inputs.current[index]) {
                inputs.current[index]!.value = char;
            }
        });
        onChange(pasteArray.join(''));
    };

    return (
        <div onPaste={handlePaste} style={{ display: 'flex', gap: '8px' }}>
            {otp.map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputs.current[index] = el)}
                    className="w-12 h-12 border-2 border-gray-300 rounded-md text-center text-xl focus:outline-none focus:border-blue-500 transition duration-200"
                />
            ))}
        </div>
    );
};

export default OtpInput;
