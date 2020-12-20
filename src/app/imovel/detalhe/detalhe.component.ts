import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImovelService } from 'src/app/backend/imovel.service';
import { Imovel } from 'src/app/backend/models/imovel.model';

@Component({
  selector: 'detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  private inscricao:Subscription;

  public imovel:Imovel;

  constructor(private route:ActivatedRoute,private imovelService:ImovelService) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params:any) => {
        this.imovelService.buscarPorId(params['id']).subscribe(imovel => {
          this.imovel = imovel;
        })
      }
    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

} 
