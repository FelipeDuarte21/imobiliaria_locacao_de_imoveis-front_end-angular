import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desmascaraCPF'
})
export class DesmascaraCPFPipe implements PipeTransform {

  transform(cpf:string): string {

    cpf = cpf.replace('.','');
    cpf = cpf.replace('.','');
    cpf = cpf.replace('-','');

    return cpf;
  }

}
