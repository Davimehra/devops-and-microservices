export class InvalidVerificationError extends Error {
    constructor(message = 'Invalid Feild Verification Error, BackendError: Please Report Error') {
        super(message)
    }
}