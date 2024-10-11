import { Component, Input } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';

@Component({
	selector: 'feedback-campo',
	templateUrl: './feedback-campo.component.html',
	styleUrls: ['./feedback-campo.component.css']
})
export class FeedbackCampoComponent {

	@Input() 
	public mostrarErro: boolean;
	
	@Input() 
	public campo: AbstractControl<any>;

	getErro(): boolean {
		return this.mostrarErro;
	}

}
