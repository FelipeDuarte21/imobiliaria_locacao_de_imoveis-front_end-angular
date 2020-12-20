import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Locacao } from 'src/app/backend/models/locacao.model';
import { LocacaoService } from 'src/app/backend/locacao.service';

@Component({
  selector: 'detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  private inscricao: Subscription;

  public locacao:Locacao;

  constructor(private locacaoService:LocacaoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe((params:any) => {
      this.locacaoService.buscarPorId(params["id"]).subscribe(loc => {
        this.locacao = loc;
      });
    });
  }

}
