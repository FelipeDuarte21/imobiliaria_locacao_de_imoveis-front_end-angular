import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formataEstadoCivil'
})
export class FormataEstadoCivilPipe implements PipeTransform {

  transform(estadoCivil: string): string {

    switch(estadoCivil){
      case 'Solteiro(a)':
        return '1';
      case 'Casado(a)':
        return '2';
      case 'Separado(a)':
        return '3';
      case 'Divorciado(a)':
        return '4';
      case 'Viúvo(a)':
        return '5';
    };

  }

}
