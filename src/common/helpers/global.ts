export function generateOTP(maxOtp = 6) {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < maxOtp; i += 1) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export function formatPhoneNumber(phoneNumber: string) {
  
}
