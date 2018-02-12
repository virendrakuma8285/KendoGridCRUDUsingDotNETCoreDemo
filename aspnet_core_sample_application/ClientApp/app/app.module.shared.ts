import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';

import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";
import { CounterComponent } from "./components/counter/counter.component";
import { GridModule } from "@progress/kendo-angular-grid";
import { MyDetailsComponent } from './components/myDetails/mydetails.Component';
import { GridEditFormComponent } from './components/myDetails/edit-form.component';
import { MyDetailService } from './components/myDetails/mydetails.services';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
	declarations: [
		GridEditFormComponent,
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
		HomeComponent,
		MyDetailsComponent
    ],
    imports: [
		GridModule,
		CommonModule,
		HttpModule,
		HttpClientModule,
		HttpClientJsonpModule,
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormsModule,
		DialogModule,
		ButtonModule,
        RouterModule.forRoot([
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "counter", component: CounterComponent },
			{ path: "fetch-data", component: FetchDataComponent },
			{ path: 'my-detail', component: MyDetailsComponent },
            { path: "**", redirectTo: "home" }
        ])
	]
};