import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { PessoaService } from "./pessoa.service";
import { ProprietarioService } from "./proprietario.service";
import { InquilinoService } from "./inquilino.service";
import { ImovelService } from "./imovel.service";
import { LocacaoService } from "./locacao.service";
import { AluguelService } from "./aluguel.service";
import { EnderecoAPIService } from "./endereco-api.service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        PessoaService,
        ProprietarioService,
        InquilinoService,
        ImovelService,
        LocacaoService,
        AluguelService,
        EnderecoAPIService
    ]
})
export class ServicesModule{

}