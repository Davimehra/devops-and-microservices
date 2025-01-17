export class OTPVerificationError extends Error {
    constructor(message = 'OTP Verification Error') {
        super(message)
    }
}