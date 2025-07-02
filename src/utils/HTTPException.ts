export class HttpException extends Error {
    public status: number;
    public message: string;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.message = message;
      // Set the prototype explicitly to ensure instanceof checks work correctly
      Object.setPrototypeOf(this, HttpException.prototype);
    }
  }
  