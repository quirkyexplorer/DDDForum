import { Server } from "http";
import request from "supertest";

export class RestFulApiDriver {

  constructor (private http: Server) {

  }

  post(url: string, data: any) {
    return request(this.http)
      .post(url)
      .set('Accept', 'application/json')
      .send(data);
  }
}