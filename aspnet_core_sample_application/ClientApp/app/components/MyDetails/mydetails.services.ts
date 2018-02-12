import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MyDetails } from './mydetails.model';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class MyDetailService {

	public myDetail: MyDetails;
	public headers: Headers;

	constructor(private http: Http) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json; charset=utf-8');
	}

	getData() {
		debugger;
		return this.http.get('/api/MyDetails/GetData');
	}

	getDetail(id: number) {
		return this.http.get('/api/MyDetails/getdetails/' + id);
	}

	postData(detail: MyDetails) {
		return this.http.post('/api/MyDetails/Save', detail);
	}

	deleteData(id: number) {
		return this.http.delete('/api/MyDetails/Delete/', new RequestOptions({
			headers: this.headers,
			body: id
		}));
	}
}