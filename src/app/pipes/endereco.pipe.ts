import { Pipe, PipeTransform } from '@angular/core';
import { Endereco } from './../backend/models/endereco.model';

@Pipe({
  name: 'endereco'
})
export class EnderecoPipe implements PipeTransform {

  mascaraCep(cep: string):string{
    let cepMascarado = "";
    for(let i=0; i < cep.length; i++){
      if(i == 1){
        cepMascarado += cep[i] + ".";
      }else if(i == 4){
        cepMascarado += cep[i] + "-";
      }else{
        cepMascarado += cep[i];
      }
    }
    return cepMascarado;
  }

  transform(endereco: Endereco): string {
    let logradouro = endereco.logradouroCep.logradouro;
    let numero = endereco.numero.numero;
    let complemento = endereco.logradouroCep.complemento;
    
    let bairro = endereco.logradouroCep.bairro.nome;
    let cidade = endereco.logradouroCep.bairro.cidade.nome;
    let estado = endereco.logradouroCep.bairro.cidade.estado.nome;
    let cep = this.mascaraCep(endereco.logradouroCep.cep);

    let enderecoCompleto = `${logradouro} ${numero} ${(complemento) != null ? complemento.complemento: " "} ${bairro} - ${cidade} / ${estado} - CEP: ${cep}`;

    return enderecoCompleto;
  }

}
