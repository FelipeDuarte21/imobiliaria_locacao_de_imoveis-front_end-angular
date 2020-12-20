import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pessoa } from 'src/app/backend/models/pessoa.model';
import { ActivatedRoute } from '@angular/router';
import { InquilinoService } from 'src/app/backend/inquilino.service';

@Component({
  selector: 'detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  private id:string;
  private inscricao: Subscription;

  public inquilino: Pessoa;

  constructor(private route: ActivatedRoute,private service: InquilinoService) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
      }
    );
    this.buscarInquilinoPorId(this.id);
  }

  buscarInquilinoPorId(id:string){
    this.service.getPorId(id).subscribe(res => {
      this.inquilino = res;
    })
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
