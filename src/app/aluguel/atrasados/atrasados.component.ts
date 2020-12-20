import { Component, OnInit } from '@angular/core';
import { AluguelService } from 'src/app/backend/aluguel.service';
import { Aluguel } from 'src/app/backend/models/aluguel.model';

@Component({
  selector: 'atrasados',
  templateUrl: './atrasados.component.html',
  styleUrls: ['./atrasados.component.css']
})
export class AtrasadosComponent implements OnInit {

  private page:number = 0;
  private size:number = 6;

  private totalPage = 0;

  public optPagina = ['6','9','12'];

  public alugueis: Array<Aluguel>;

  constructor(private aluguelService:AluguelService) { }

  ngOnInit() {
    this.buscarAlugueis(this.page,this.size);
  }

  setSize(size:number){
    this.size = size;
    this.buscarAlugueis(this.page,this.size);
  }

  buscarPorPagina(pagina:number){
    this.buscarAlugueis(pagina,this.size);
  }

  getTotalPage(){
    return this.totalPage;
  }

  buscarAlugueis(pagina:number,size:number){
    this.aluguelService.buscarPorAtrasado(pagina,size).subscribe(res => {
      this.alugueis = res.content;
      this.totalPage = res.totalPages;
    });
  }

}
