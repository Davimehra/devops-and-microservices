export class PasswordVerificationError extends Error {
    constructor(message = 'Password Verification Error') {
        super(message)
    }
}