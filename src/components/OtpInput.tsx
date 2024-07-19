import React, { useState } from 'react';

interface OtpInputProps {
  length: number;
  onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(''));

    if (value && element.nextSibling instanceof HTMLInputElement) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData('text').split('').slice(0, length);
    const newOtp = [...otp];

    pasteData.forEach((char, index) => {
      if (/^[0-9]$/.test(char)) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);
    onChange(newOtp.join(''));
  };

  return (
    <div>
      {Array(length).fill(null).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onPaste={handlePaste}
          style={{ width: '2em', margin: '0.5em', textAlign: 'center' }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
