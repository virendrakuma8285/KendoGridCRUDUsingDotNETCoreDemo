import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MyDetails } from './mydetails.model';

@Component({
	selector: 'kendo-grid-edit-form',
	styles: [
		'input[type=text] { width: 100%; }'
	],
	templateUrl: './edit-form.component.html' 
})
export class GridEditFormComponent {
	public active = false;
	public editForm: FormGroup = new FormGroup({
		'id': new FormControl(),
		'firstName': new FormControl('', Validators.required),
		'lastName': new FormControl(),
		//'adharNumber': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])), //if you want to put validation
		'adharNumber': new FormControl(),
		'email': new FormControl(),
		'phoneNumber': new FormControl()
	});

	@Input() public isNew = false;

	@Input() public set model(detail: MyDetails) {
		this.editForm.reset(detail);

		this.active = detail !== undefined;
	}

	@Output() cancel: EventEmitter<any> = new EventEmitter();
	@Output() save: EventEmitter<MyDetails> = new EventEmitter();

	public onSave(e): void {
		e.preventDefault();
		this.save.emit(this.editForm.value);
		this.active = false;
	}

	public onCancel(e): void {
		e.preventDefault();
		this.closeForm();
	}

	private closeForm(): void {
		this.active = false;
		this.cancel.emit();
	}
}
