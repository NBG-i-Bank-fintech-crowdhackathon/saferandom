/// <reference path="./ts.definitions/jquery.d.ts"/>
import {Injectable} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from "rxjs/Rx";
import {Contest} from "./models/Contest";
import { HTTP_PROVIDERS } from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Http, Response} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestsService {
	private static ip: string = "http://192.168.122.1:8080";

	constructor(private http: Http){}

	
	public getContests():Observable<any>{

		let body = JSON.stringify({api_key: "32e17e3b85e2f5db814d583e201c6f4f",
								   mine: true });

    	let headers = new Headers({ 'Content-Type': 'application/json' });
  		let options = new RequestOptions({ headers: headers });

		return this.
				http.
				post(RequestsService.ip + "/api/getContests", body, options).
				map(this.extractData);

	}


	public searchContest(title: string): Observable<Contest[]>{

	}

	private extractData(res: Response) {
		console.log(res);
	    if (res.status < 200 || res.status >= 300) {
	      throw new Error('Bad response status: ' + res.status);
	    }
	    let body = res.json();
	    return body.data || { };
	}

}