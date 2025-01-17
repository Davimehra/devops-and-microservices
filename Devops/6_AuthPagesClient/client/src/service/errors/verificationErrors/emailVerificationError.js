export class EmailVerificationError extends Error {
    constructor(message = 'Email Verification Error') {
        super(message)
    }
}