class ApiResponse<T> {
    public statusCode: number;
    public status: boolean;
    public message: string;
    public data: T;
  
    constructor(statusCode: number, data: T, message: string = 'Success') {
      this.statusCode = statusCode;
      this.status = statusCode < 300;
      this.message = message;
      this.data = data;
    }
  }
  
  export { ApiResponse };
  