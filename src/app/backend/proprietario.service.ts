import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { PagePessoa } from './models/pages/pessoa.page.model';
import { Pessoa } from './models/pessoa.model';
import { EnderecoService } from './endereco.service';
import { EnderecoAPI } from './models/endereco.api.model';
import { PessoaService } from './pessoa.service';
import { PessoaDTO } from './models/pessoa.dto.model';

@Injectable()
export class ProprietarioService{

  private local_route_especifica = `${this.pessoaService.local_route}/proprietarios`;

  constructor(
    private http: HttpClient,
    private enderecoService:EnderecoService,
    private pessoaService: PessoaService) {}

  public getTodos(page:number,size:number): Observable<PagePessoa>{
    return this.http.get<PagePessoa>(`${this.local_route_especifica}?page=${page}&size=${size}`);
  }

  public getTodosSemPagina():Observable<Array<Pessoa>>{
    return this.http.get<Array<Pessoa>>(`${this.local_route_especifica}/all`);
  }

  public getPorNome(nome:string,page:number,size:number): Observable<PagePessoa>{
    return this.http.get<PagePessoa>(`${this.local_route_especifica}/search?nome=${nome}&page=${page}&size=${size}`);
  }

  public getPorId(id:string): Observable<Pessoa>{
    return this.pessoaService.getPorId(id);
  }

  public getPorCPF(cpf:string): Observable<Pessoa>{
    return this.pessoaService.getPorCPF(cpf);
  }

  public cadastrar(proprietario: PessoaDTO):Observable<Pessoa>{
    return this.pessoaService.cadastrar(proprietario);
  }

  public atualizar(proprietario:PessoaDTO): Observable<Pessoa>{
    return this.pessoaService.atualizar(proprietario);
  }

  public excluir(id:string): Observable<any>{
    return this.pessoaService.excluir(id);
  }

  public buscarPorCep(cep:string):Observable<EnderecoAPI>{
    return this.enderecoService.buscarPorCep(cep);
  }

}
 