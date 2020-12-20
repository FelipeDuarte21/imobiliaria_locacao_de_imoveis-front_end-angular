import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desformataData'
})
export class DesformataDataPipe implements PipeTransform {

  transform(data: string): string {
    
    let partes = data.split('-');

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

  }

}
