import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desmascaraTelefone'
})
export class DesmascaraTelefonePipe implements PipeTransform {

  transform(telefone: string): string {

    let extras = ['(',')','-',' '];
    
    extras.forEach(extra => {
      telefone = telefone.replace(extra,'');
    })

    return telefone;
  }

}
