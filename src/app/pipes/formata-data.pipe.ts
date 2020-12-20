import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formataData'
})
export class FormataDataPipe implements PipeTransform {

  transform(data: string): string {
    
    let partes = data.split('/');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;

  }

}
