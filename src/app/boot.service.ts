import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from  '@angular/common/http' ;

@Injectable({
  providedIn: 'root'
})
export class BootService {

  private URL :  string  =  " https://api.dialogflow.com/v1/query?v=20150910 " ;
  private clientKey :  string  =  '5cab53320ea04f69853ea1636a7c6a88'

  constructor(private http: HttpClient) { }

  public getAnswer(query: string) {
    let data = {
      query: query,
      lang: 'english',
      sessionId: '42896'
    }
    return this.http
      .post(`${this.URL}`, data, { headers: this.getHttpHeaders() })


  }

  public getHttpHeaders() {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', `Bearer ${this.clientKey}`);
    return httpHeaders;
  }
}

