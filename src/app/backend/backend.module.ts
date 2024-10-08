import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProprietarioService } from './proprietario.service';
import { EnderecoService } from './endereco.service';
import { PessoaService } from './pessoa.service';
import { InquilinoService } from './inquilino.service';
import { ImovelService } from './imovel.service';
import { LocacaoService } from './locacao.service';
import { AluguelService } from './aluguel.service';
import { HomeService } from './home.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ProprietarioService,
    EnderecoService,
    PessoaService,
    InquilinoService,
    ImovelService,
    LocacaoService,
    AluguelService,
    HomeService
  ]
})
export class BackendModule { }
