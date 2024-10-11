import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desmascaraCelular'
})
export class DesmascaraCelularPipe implements PipeTransform {

  transform(celular: string): string {

    let extras = ['(',')','-',' '];
    
    extras.forEach(extra => {
      celular = celular.replace(extra,'');
    })

    return celular;
  }

}
