import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AluguelService } from './aluguel.service';
import { ImovelService } from './imovel.service';
import { InquilinoService } from './inquilino.service';
import { LocacaoService } from './locacao.service';
import { ProprietarioService } from './proprietario.service';

@Injectable()
export class HomeService{

    constructor(
        private proprietarioService:ProprietarioService,
        private inquilinoService:InquilinoService,
        private imovelService: ImovelService,
        private locacaoService: LocacaoService,
        private aluguelSerivice: AluguelService
    ){}

    public getTotalProprietarios(){
        return this.proprietarioService.getTodosSemPagina();
    }

    public getTotalInquilinos(){
        return this.inquilinoService.getTodosSemPagina();
    }

    public getTotalImoveis(){
        return this.imovelService.buscarTodosSemPagina();
    }

    public getTotalLocacoes(){
        return this.locacaoService.buscarTodosSemPagina();
    }

    public getTotalAlugueisAtrasados(){
        return this.aluguelSerivice.buscarPorAtrasadoSemPagina();
    }


}