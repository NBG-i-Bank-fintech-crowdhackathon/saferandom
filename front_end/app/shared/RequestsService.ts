/// <reference path="./ts.definitions/jquery.d.ts"/>
import {Injectable} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from "rxjs/Rx";
import {Contest} from "./models/Contest";
import { HTTP_PROVIDERS } from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Http, Response} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class RequestsService {
	private static ip: string = "http://127.0.0.1:8081";

	constructor(private http: Http){}

	
	public getContests(): Observable<Contest[]>{

		let body = JSON.stringify({api_key: "32e17e3b85e2f5db814d583e201c6f4f",
								   mine: true });

    	let headers = new Headers({ 'Content-Type': 'application/json' });
  		let options = new RequestOptions({ headers: headers });

			return this.
				http.
				post(RequestsService.ip + "/api/getContests", body, options).
				map(this.extractData).
				map((jsonArray: Array<Object>) => {
					return jsonArray.map((data: Object) => {
						return new Contest(data.id, data.title, data.state, data.type, data.endtime, data.details);
					});
				})
				.catch(this.handleError);

	}


	public getContestDetails(id: number): Observable<Contest>{
		let body = JSON.stringify({ contest_id : id});

    	let headers = new Headers({ 'Content-Type': 'application/json' });
	 		let options = new RequestOptions({ headers: headers }); 

		return this.
				http.
				post(RequestsService.ip + "/api/getContestDetails", body, options).
				map(this.extractData).
				map((data: Object) => {
					return new Contest(data.id, data.title, data.state, data.type, data.endtime, data.details, data.participations);
				})
				.catch(this.handleError);
	}


	public saveContestParticipants(id: number, arrayOfParticipants: Array<Object>): Observable<boolean>{
		let body = JSON.stringify({ cid : id,
									participations: arrayOfParticipants});

	   	let headers = new Headers({ 'Content-Type': 'application/json' });
	 	let options = new RequestOptions({ headers: headers }); 
		
		return this.
				http.
				post(RequestsService.ip + "/api/addParticipations", body, options).
				map(this.extractData)
				.catch(this.handleError);

	}


	public searchContest(title: string): Observable<Contest[]>{

	}

	 private handleError (error: any) {
	    // In a real world app, we might send the error to remote logging infrastructure
		  let errMsg = error.message || 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	  }

	private extractData(res: Response): any {
	    if (res.status < 200 || (res).status >= 300) {
	      throw new Error('Bad response status: ' + res.status);
	    }

		console.log(res.json());

	    return res.json() || { };
	}

}