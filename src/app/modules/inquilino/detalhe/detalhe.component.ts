import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from 'src/app/models/pessoa.model';
import { InquilinoService } from 'src/app/services/inquilino.service';

@Component({
	selector: 'detalhe',
	templateUrl: './detalhe.component.html',
	styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

	private id: number;
	private inscricao: Subscription;

	public inquilino: Pessoa;

	constructor(
		private route: ActivatedRoute, 
		private inquilinoService: InquilinoService
	) { }

	ngOnInit() {
		this.inscricao = this.route.params.subscribe({
			next: params => {
				this.id = params['id'];
			}
		});

		this.buscarInquilinoPorId(this.id);
	}

	buscarInquilinoPorId(id: number) {
		this.inquilinoService.getPorId(id).subscribe(res => {
			this.inquilino = res;
		})
	}

	ngOnDestroy() {
		this.inscricao.unsubscribe();
	}

}
