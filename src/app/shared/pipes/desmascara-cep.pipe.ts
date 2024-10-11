import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desmascaraCEP'
})
export class DesmascaraCEPPipe implements PipeTransform {

  transform(cep: string): string {
    
    cep = cep.replace('.','');
    cep = cep.replace('-','');

    return cep;

  }

}
