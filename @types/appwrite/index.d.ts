declare module 'appwrite' {
  export class AppwriteException extends Error {
    constructor(message: string, code?: number, response?: any);
    message: string;
    code?: number;
    response?: any;
  }

  // Add other necessary type declarations for the Appwrite module here
}
