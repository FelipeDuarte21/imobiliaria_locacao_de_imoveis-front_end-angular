import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(cep: string): string {
    
    let cepMascarado = ""

    for(let i=0; i < cep.length; i++){

      cepMascarado += cep[i];

      if(i == 1){
        cepMascarado += "."
      }

      if(i == 4){
        cepMascarado += "-"
      }

    }

    return cepMascarado;
  }

}
