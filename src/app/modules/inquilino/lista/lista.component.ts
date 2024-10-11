import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa.model';
import { InquilinoService } from 'src/app/services/inquilino.service';

@Component({
	selector: 'lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

	private inquilinos: Array<Pessoa>;

	private page = 0;
	private size = 6;

	private total_pages = 0;

	optPagina = ['6', '9', '12'];

	constructor(
		private inquilinoService: InquilinoService
	) { }

	ngOnInit() {
		this.buscarInquilinos(this.page, this.size);
	}

	public getInquilinos(): Array<Pessoa> {
		return this.inquilinos;
	}

	public getTotalPage(): number {
		return this.total_pages;
	}

	public setSize(value: number) {
		this.size = value
		this.buscarInquilinos(this.page, this.size);
	}

	public buscarPorPagina(pagina: number) {
		this.buscarInquilinos(pagina, this.size);
	}

	public buscarPorNome(nome: string) {
		this.inquilinoService.getPorNome(nome, this.page, this.size).subscribe({
			next: res => {
				this.total_pages = res.totalPages;
				this.inquilinos = res.content;
			}
		});
	}

	private buscarInquilinos(page: number, size: number) {
		this.inquilinoService.getTodos(page, size).subscribe({
			next: res => {
				this.total_pages = res.totalPages;
				this.inquilinos = res.content
			}
		});
	}

	public removerInquilino(id: number) {
		this.inquilinoService.excluir(id).subscribe({
			next: res => {
				alert("Inquilino Excluído Com Sucesso!");
				this.buscarInquilinos(0, this.size);
			}
		});
	}

}
