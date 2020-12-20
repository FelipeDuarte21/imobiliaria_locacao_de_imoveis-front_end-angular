import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PessoaService } from './pessoa.service';
import { EnderecoService } from './endereco.service';
import { Observable } from 'rxjs';
import { Pessoa } from './models/pessoa.model';
import { map } from 'rxjs/operators';
import { EnderecoAPI } from './models/endereco.api.model';
import { PagePessoa } from './models/pages/pessoa.page.model';
import { PessoaDTO } from './models/pessoa.dto.model';

@Injectable()
export class InquilinoService{

    private local_route_especifico = `${this.pessoaService.local_route}/inquilinos`;

    constructor(
        private http: Http,
        private enderecoService:EnderecoService,
        private pessoaService:PessoaService){}

    public getTodos(page:number,size:number):Observable<PagePessoa>{
        return this.http.get(`${this.local_route_especifico}?page=${page}&size=${size}`).pipe(map(res => res.json()));
    }

    public getTodosSemPagina():Observable<Array<Pessoa>>{
        return this.http.get(`${this.local_route_especifico}/all`).pipe(map(res => res.json()));
    }

    public getPorNome(nome:string,page:number,size:number):Observable<PagePessoa>{
        return this.http.get(`${this.local_route_especifico}/search?nome=${nome}&page=${page}&size=${size}`).pipe(map(res => res.json()));
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