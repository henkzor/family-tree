class NotFoundError {
  message: string;
  status: number;

  constructor(message: any) {
    this.message = message;
    this.status = 404;
  }
}

export {NotFoundError};