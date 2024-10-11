import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Locacao } from 'src/app/models/locacao.model';
import { LocacaoService } from 'src/app/services/locacao.service';


@Component({
	selector: 'detalhe',
	templateUrl: './detalhe.component.html',
	styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

	private inscricao: Subscription;

	public locacao: Locacao;

	constructor(
		private locacaoService: LocacaoService, 
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.inscricao = this.route.params.subscribe({
			next: params => {
				this.buscarPorId(params['id']);
			}
		});
	}

	private buscarPorId(id: number) {
		this.locacaoService.buscarPorId(id).subscribe({
			next: loc => {
				this.locacao = loc;
			}
		});
	}

}
