import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celular'
})
export class CelularPipe implements PipeTransform {

  transform(celular: string): string {
    let celularMascarado = "(";
    for(let i=0; i < celular.length; i++){
      if(i == 1){
        celularMascarado += celular[i] + ") ";
      }else if(i == 6){
        celularMascarado += celular[i] + "-";
      }else{
        celularMascarado += celular[i];
      }
    }
    return celularMascarado;
  }

}
