import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    postCall(call: any) {
        //const headers = new HttpHeaders({'Content-type': 'application/json'});
        console.log(call);
        //return this.http.post('/api/v1/utxos/new', call, {headers: headers});
    }
}