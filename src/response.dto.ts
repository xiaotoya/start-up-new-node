export class ResponseDTO<T> {
    constructor(code: string | number, status: string, data: T, path: string, timestamp: number = Date.now()) {
        this.code = code;
        this.status = status;
        this.data = data;
        this.path = path;
        this.timestamp = timestamp;
    }
    code: string | number;
    status: string;
    timestamp: number;
    data: T;
    path: string;
}