export class ClassesError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ClassesError';
    }
}

export default ClassesError;
