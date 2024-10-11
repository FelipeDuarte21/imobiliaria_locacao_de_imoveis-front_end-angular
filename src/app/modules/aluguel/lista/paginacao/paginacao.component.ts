import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'paginacao',
	templateUrl: './paginacao.component.html',
	styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent {

	@Input() optPagina: Array<string>;
	@Input() totalPagina: number;

	@Output() qtdPorPagina = new EventEmitter();
	@Output() pagina = new EventEmitter();

	private elementoAtivo: HTMLElement;
	private carregado: boolean = false;

	onChange(value: number) {
		this.carregado = false;
		this.elementoAtivo.classList.remove('active');
		this.elementoAtivo = undefined;
		return this.qtdPorPagina.emit(value);
	}

	public getTotalPagina(): Array<number> {
		if (this.totalPagina == 0) {
			this.carregado = false;
		}
		return new Array(this.totalPagina);
	}

	public onClick(elemento: HTMLElement, value: number) {
		if (this.elementoAtivo) {
			this.elementoAtivo.classList.remove('active');
		}

		elemento.classList.add("active");

		this.elementoAtivo = elemento;

		return this.pagina.emit(value);
	}

	public setPrimeiro(elemento: HTMLElement, index: number) {

		if (index === 0 && !this.carregado) {
			elemento.classList.add("active");
			this.elementoAtivo = elemento;
			this.carregado = true;
		}

		return true;
	}

}
