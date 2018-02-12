import { Observable } from 'rxjs/Observable';
import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/observable/fromEvent";

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

//import { Product } from './model';
//import { EditService } from './edit.service';

import { map } from 'rxjs/operators/map';

@Component({
    selector: "fetchdata",
    templateUrl: "./fetchdata.component.html",
    styleUrls: ["./../../../../node_modules/@progress/kendo-theme-default/dist/all.css"],
    encapsulation: ViewEncapsulation.None
})
export class FetchDataComponent {
    public forecasts: IWeatherForecast[];

    constructor(http: HttpClient, @Inject("ORIGIN_URL") originUrl: string) {
        http.get(originUrl + "/api/SampleData/WeatherForecasts").subscribe(result => {
            this.forecasts = result as IWeatherForecast[];
        });
    }
}

interface IWeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
