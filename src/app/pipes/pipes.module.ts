import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CelularPipe } from './celular.pipe';
import { CepPipe } from './cep.pipe';
import { CpfPipe } from './cpf.pipe';
import { DesformataDataPipe } from './desformata-data.pipe';
import { DesmascaraCEPPipe } from './desmascara-cep.pipe';
import { DesmascaraCPFPipe } from './desmascara-cpf.pipe';
import { DesmascaraTelefonePipe } from './desmascara-telefone.pipe';
import { EnderecoPipe } from './endereco.pipe';
import { FormataDataPipe } from './formata-data.pipe';
import { FormataEstadoCivilPipe } from './formata-estado-civil.pipe';
import { TelefonePipe } from './telefone.pipe';


@NgModule({
  declarations: [
    CelularPipe,
    CepPipe,
    CpfPipe,
    DesformataDataPipe,
    DesmascaraCEPPipe,
    DesmascaraCPFPipe,
    DesmascaraTelefonePipe,
    EnderecoPipe,
    FormataDataPipe,
    FormataEstadoCivilPipe,
    TelefonePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CelularPipe,
    CepPipe,
    CpfPipe,
    DesformataDataPipe,
    DesmascaraCEPPipe,
    DesmascaraCPFPipe,
    DesmascaraTelefonePipe,
    EnderecoPipe,
    FormataDataPipe,
    FormataEstadoCivilPipe,
    TelefonePipe
  ]
})
export class PipesModule { }
