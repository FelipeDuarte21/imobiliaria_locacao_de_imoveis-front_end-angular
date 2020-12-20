import { Component, OnInit } from '@angular/core';
import { Imovel } from 'src/app/backend/models/imovel.model';
import { ImovelService } from 'src/app/backend/imovel.service';

@Component({
  selector: 'lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  private imoveis:Array<Imovel>;

  private page = 0;
  private size = 6;

  private total_pages = 0;

  optPagina = ['6','9','12'];

  constructor(private imovelService:ImovelService) { }
  
  ngOnInit() {
    this.buscarImoveis(this.page,this.size);
  }

  public getImoveis():Array<Imovel>{
    return this.imoveis;
  }

  public getTotalPage(): number{
    return this.total_pages;
  }

  public setSize(value: number){
    this.size = value;
    this.buscarImoveis(this.page,this.size);
  }

  public buscarPorPagina(pagina:number){
    this.buscarImoveis(pagina,this.size);
  }

  public buscarPorNomeProprietario(nome:string){
    this.imovelService.buscarPorNomeProprietario(nome,this.page,this.size).subscribe(res => {
      this.total_pages = res.totalPages;
      this.imoveis = res.content;
    });
  }

  private buscarImoveis(page:number,size:number){
    this.imovelService.buscarTodos(page,size).subscribe(res => {
      this.total_pages = res.totalPages;
      this.imoveis = res.content;
    });
  }

  public removerImovel(id:string){
    this.imovelService.excluir(id).subscribe(res => {

      alert("Imovel Excluído Com Sucesso!");
      
      this.buscarImoveis(0,this.size);

    });
  }

}
