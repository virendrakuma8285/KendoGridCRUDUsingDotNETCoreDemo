import { Observable } from 'rxjs/Observable';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyDetailService } from './mydetails.services';
import { MyDetails } from './mydetails.model';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { map } from 'rxjs/operators/map';

@NgModule({
	imports: [BrowserModule, RouterModule],
	declarations: [MyDetailsComponent],
	exports: [MyDetailsComponent]
})

@Component({
	selector: 'mydetail',
	templateUrl: './mydetails.Component.html',
	providers: [MyDetailService],
		styleUrls: ["./../../../../node_modules/@progress/kendo-theme-default/dist/all.css"],
	 encapsulation: ViewEncapsulation.None
})

export class MyDetailsComponent implements OnInit {
	public myDetails: MyDetails[];

	public detail: MyDetails;
	private id: number;

	public view: Observable<GridDataResult>; // this and the other things related to it are not used in the current functionality
	public gridState: State = {
		sort: [],
		skip: 0,
		take: 10
	};

	public isNew: boolean;

	constructor(private myDetailService: MyDetailService) {
		
	}

	public ngOnInit(): void {
		this.getListData();
	}

	getListData() {
		this.myDetailService.getData().subscribe(data => {
			this.myDetails = [];
			this.myDetails = data.json() as MyDetails[];
		},
			error => console.log(error)
		);
	}

	public onStateChange(state: State) {
		this.gridState = state;

		this.getListData();
	}

	public editHandler({ dataItem }) {
		this.detail = dataItem;

		this.isNew = false;
	}

	public addHandler() {
		this.detail = new MyDetails();
		this.detail.id = 0;

		this.isNew = true;
	}

	public cancelHandler() {
		this.detail = undefined;
	}

	public saveHandler(myDetails: MyDetails) {
		this.myDetailService.postData(myDetails)
			.subscribe(
			(response) => {
				console.log(response);
				this.getListData();
			},
			(error) => console.log(error)
			);
		this.detail = undefined;
	}

	public removeHandler({ dataItem }) {
		this.onDelete(dataItem.id);
	}

	onDelete(id: number) {
		this.detail = undefined;

		this.myDetailService.deleteData(id).subscribe(data => {
			this.getListData();
		},
			error => console.log(error)
		);
	}
} 