class AppError extends Error {
  constructor(message: string, public statuscode: number) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
