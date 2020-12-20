import { Component, OnInit } from '@angular/core';

import { ProprietarioService } from 'src/app/backend/proprietario.service';

import { Pessoa } from 'src/app/backend/models/pessoa.model';

@Component({
  selector: 'lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  private proprietarios: Array<Pessoa>;
  
  private page = 0;
  private size = 6;

  private total_pages = 0;

  optPagina = ['6','9','12'];

  constructor(private service: ProprietarioService) { }

  ngOnInit() {
    this.buscarProprietarios(this.page,this.size);
  }

  public getProprietarios(): Array<Pessoa>{
    return this.proprietarios;
  }

  public getTotalPage(): number{
    return this.total_pages;
  }

  public setSize(value: number){
    this.size = value
    this.buscarProprietarios(this.page,this.size);
  }

  public buscarPorPagina(pagina:number){
    this.buscarProprietarios(pagina,this.size);
  }

  public buscarPorNome(nome:string){
    this.service.getPorNome(nome,this.page,this.size).subscribe(res => {
      this.total_pages = res.totalPages;
      this.proprietarios = res.content;
    });
  }

  private buscarProprietarios(page:number,size:number){
    this.service.getTodos(page,size).subscribe(res => {
      this.total_pages = res.totalPages;
      this.proprietarios = res.content
    });
  }

  public removerProprietario(id:string){
    this.service.excluir(id).subscribe(res => {

      alert("Proprietário Excluído Com Sucesso!");
      
      this.buscarProprietarios(0,this.size);

    });
  }

}
