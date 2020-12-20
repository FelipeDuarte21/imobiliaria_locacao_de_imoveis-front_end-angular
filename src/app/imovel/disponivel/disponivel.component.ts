import { Component, OnInit } from '@angular/core';
import { ImovelService } from 'src/app/backend/imovel.service';
import { PageImovel } from 'src/app/backend/models/pages/imovel.page.model';
import { Imovel } from 'src/app/backend/models/imovel.model';

@Component({
  selector: 'disponivel',
  templateUrl: './disponivel.component.html',
  styleUrls: ['./disponivel.component.css']
})
export class DisponivelComponent implements OnInit {

  public page:number = 0;
  public size:number = 3;

  public totalPages = 0;
  public totalElementos:number = 0;

  private valor:number;
  
  optPagina = ['3','6','9'];

  public imoveis:Array<Imovel>;

  public encontrado = false;

  constructor(private imovelService:ImovelService) { }

  ngOnInit() {
    this.buscarTodosDisponiveis(this.page,this.size);
  }

  setSize(size:number){
    this.size = size;
    if(this.valor){
      this.buscarPorPreco(this.valor,0,this.size);
    }else{
      this.buscarTodosDisponiveis(0,this.size);
    }
  }

  getTotalPage():number{
    return this.totalPages;
  }

  buscarPorPagina(page:number){
    if(this.valor){
      this.buscarPorPreco(this.valor,page,this.size);
    }else{
      this.buscarTodosDisponiveis(page,this.size);
    }
  }

  buscarPorPreco(preco:number,page:number,size:number){
    if(preco){
      let p = (page == null) ? 0 : page; 
      let s = (size == null) ? 3 : size;
      this.imovelService.buscarDisponiveisPorPreco(preco,p,s).subscribe(res => {
        this.config(res);
      });
    }else{
      this.buscarTodosDisponiveis(0,this.size);
    }
    this.valor = preco;
  }

  buscarTodosDisponiveis(page:number,size:number){
    this.imovelService.buscarTodosDisponiveis(page,size).subscribe(res => {
      this.config(res);
    });
  }

  config(res:PageImovel){
    this.imoveis = res.content;
    if(res.content.length > 0){
      this.encontrado = true;
    }else{
      this.encontrado = false;
    }
    this.page = res.number;
    this.size = res.size;
    this.totalPages = res.totalPages;
    this.totalElementos = res.totalElements;
  }

}
