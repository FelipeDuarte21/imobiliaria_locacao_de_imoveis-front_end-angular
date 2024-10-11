import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Imovel } from 'src/app/models/imovel.model';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
	selector: 'detalhe',
	templateUrl: './detalhe.component.html',
	styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

	private inscricao: Subscription;

	public imovel: Imovel;

	constructor(
		private route: ActivatedRoute, 
		private imovelService: ImovelService
	) { }

	ngOnInit() {
		this.inscricao = this.route.params.subscribe({
			next: params => {
				this.buscarPorId(params['id']);
			}
		});

	}

	private buscarPorId(id: number){
		this.imovelService.buscarPorId(id).subscribe({
			next: imovel => {
				this.imovel = imovel;
			}
		});
	}

	ngOnDestroy() {
		this.inscricao.unsubscribe();
	}

} 
