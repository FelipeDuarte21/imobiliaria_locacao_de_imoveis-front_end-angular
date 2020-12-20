import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: string): string {
    let cpfMascarado = "";
    for(let i=0; i < value.length; i++){
      if(i == 2 || i == 5){
        cpfMascarado += value[i] + ".";
      }else if(i == 8){
        cpfMascarado += value[i] + "-";
      }else{
        cpfMascarado += value[i];
      }
    }
    return cpfMascarado;
  }

}
