import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnderecoAPI } from '../models/endereco-api.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class EnderecoAPIService{

    private api_endereco:string = environment.api_endereco;

    constructor(
        private http: HttpClient
    ){}

    buscarPorCep(cep:string): Observable<EnderecoAPI>{
        return this.http.get<EnderecoAPI>(`${this.api_endereco}/${cep}/json/`);
    }

}