import { Component, OnInit } from '@angular/core';
import { Aluguel } from 'src/app/models/aluguel.model';
import { AluguelService } from 'src/app/services/aluguel.service';
import { DesformataDataPipe } from 'src/app/shared/pipes/desformata-data.pipe';

@Component({
	selector: 'lista',
	templateUrl: './lista.component.html',
	styleUrls: ['./lista.component.css'],
	providers: [DesformataDataPipe]
})
export class ListaComponent implements OnInit {

	public busca = {
		inicio: null,
		fim: null
	}

	private page: number = 0;
	private size: number = 6;

	private totalPages = 0;

	public optPagina = ['6', '9', '12'];

	public alugueis: Array<Aluguel>;

	private periodo: boolean = false;

	constructor(
		private aluguelService: AluguelService,
		private desformataData: DesformataDataPipe
	) { }

	ngOnInit() {
		this.buscarAlugueis(this.page, this.size);
	}

	public setSize(size: number) {
		this.size = size;
		this.periodo = false;
		this.buscarAlugueis(this.page, this.size);
	}

	public getTotalPage() {
		return this.totalPages;
	}

	public buscarPorPagina(pagina: number) {
		if (this.periodo) {
			this.pesquisarPorPeriodo(pagina);
		} else {
			this.buscarAlugueis(pagina, this.size);
		}
	}

	buscarAlugueis(pagina: number, size: number) {
		this.aluguelService.buscarTodos(pagina, size).subscribe(res => {
			this.alugueis = res.content;
			this.totalPages = res.totalPages;
		});
	}

	pesquisarPorPeriodo(pagina: number) {
		let inicio = this.desformataData.transform(this.busca.inicio);
		let fim = this.desformataData.transform(this.busca.fim);

		let p = (pagina != null) ? pagina : 0;

		this.aluguelService.buscarPorPeriodo(inicio, fim, p, this.size).subscribe(res => {
			this.alugueis = res.content;
			this.totalPages = res.totalPages;
			this.periodo = true;
		});
	}

} 
