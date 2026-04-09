export type ApiError = {
    status: number;
    message: string;
    code?: string;
  };
  
  export class UnauthorizedError extends Error {
    constructor(message = "Session expired. Please log in again.") {
      super(message);
      this.name = "UnauthorizedError";
    }
  }
  
  export class ForbiddenError extends Error {
    constructor(message = "You do not have permission to perform this action.") {
      super(message);
      this.name = "ForbiddenError";
    }
  }
  
  export class NetworkError extends Error {
    constructor(message = "Network error. Please check your connection.") {
      super(message);
      this.name = "NetworkError";
    }
  }
  
  export class ServerError extends Error {
    constructor(message = "Something went wrong. Please try again later.") {
      super(message);
      this.name = "ServerError";
    }
  }
  