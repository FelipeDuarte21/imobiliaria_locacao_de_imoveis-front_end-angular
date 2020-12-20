import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Pessoa } from 'src/app/backend/models/pessoa.model';
import { ProprietarioService } from 'src/app/backend/proprietario.service';

@Component({
  selector: 'detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  private id:string;
  private inscricao: Subscription;

  public proprietario: Pessoa;

  constructor(private route: ActivatedRoute,private service: ProprietarioService) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
      }
    );
    this.buscarProprietarioPorId(this.id);
  }

  buscarProprietarioPorId(id:string){
    this.service.getPorId(id).subscribe(res => {
      this.proprietario = res;
    })
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
