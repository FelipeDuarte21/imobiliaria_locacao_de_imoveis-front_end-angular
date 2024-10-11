import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'pesquisa',
	templateUrl: './pesquisa.component.html',
	styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent {

	@Output() 
	private valor = new EventEmitter();

	pesquisar(value: string) {
		return this.valor.emit(value);
	}

	onKeyup(value: string) {
		return this.valor.emit(value);
	}

}
