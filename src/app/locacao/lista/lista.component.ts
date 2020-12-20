import { Component, OnInit } from '@angular/core';
import { LocacaoService } from 'src/app/backend/locacao.service';
import { Locacao } from 'src/app/backend/models/locacao.model';

@Component({
  selector: 'lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  private page:number = 0;
  private size:number = 6;

  private totalPages = 0;

  private locacoes:Array<Locacao>;

  public optPagina = ['6','9','12'];

  constructor(private locacaoService:LocacaoService) { }

  ngOnInit() {
    this.buscarLocacoes(this.page,this.size);
  }
 
  buscarLocacoes(page:number,size:number){
    this.locacaoService.buscarTodos(page,size).subscribe(res => {
      this.locacoes = res.content;
      this.totalPages = res.totalPages;
    });
  }

  public getLocacoes():Array<Locacao>{
    return this.locacoes;
  }

  public setSize(valor:number){
    this.size = valor;
    this.buscarLocacoes(this.page,this.size);
  }

  public getTotalPage(){
    return this.totalPages;
  }

  public buscarPorPagina(pagina:number){
    this.buscarLocacoes(pagina,this.size);
  }

  public buscarPorInquilino(nome:string){
    this.locacaoService.buscarLocacoesInquilinosPorNome(nome,0,this.size).subscribe(res => {
      this.locacoes = res.content;
      this.totalPages = res.totalPages;
    })
  }

  public buscarPorProprietario(nome:string){
    this.locacaoService.buscarLocacoesProprietariosPorNome(nome,0,this.size).subscribe(res => {
      this.locacoes = res.content;
      this.totalPages = res.totalPages;
    });
  }

  public removerLocacao(id:string){ 
    this.locacaoService.excluir(id).subscribe(res => {

      alert("Locação Excluída Com Sucesso!");
      
      this.buscarLocacoes(0,this.size);

    });
  }


}
