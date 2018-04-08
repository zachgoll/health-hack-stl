import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    postCall(call: any) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post('/make-call', call, { headers: headers });
    }

    getLogs(number: any) {
        return this.http.get(`/${number}/call-statuses`);
    }
}