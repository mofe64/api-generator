class OperationError extends Error {
  constructor(message, operation, info) {
    super(message);
    this.operation = operation;
    this.info = info;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default OperationError;
