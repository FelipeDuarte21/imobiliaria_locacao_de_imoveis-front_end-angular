import { Pipe, PipeTransform } from '@angular/core';
import { Endereco } from 'src/app/models/endereco.model';

@Pipe({
	name: 'endereco'
})
export class EnderecoPipe implements PipeTransform {

	mascaraCep(cep: string): string {
		let cepMascarado = "";
		for (let i = 0; i < cep.length; i++) {
			if (i == 1) {
				cepMascarado += cep[i] + ".";
			} else if (i == 4) {
				cepMascarado += cep[i] + "-";
			} else {
				cepMascarado += cep[i];
			}
		}
		return cepMascarado;
	}

	transform(endereco: Endereco): string {
		let logradouro = endereco.logradouro;
		let numero = endereco.numero;
		let complemento = endereco.complemento;

		let bairro = endereco.bairro;
		let cidade = endereco.cidade
		let estado = endereco.estado;
		let cep = this.mascaraCep(endereco.cep);

		let enderecoCompleto = `${logradouro} ${numero} ${(complemento) != null ? complemento : " "} ${bairro} - ${cidade} / ${estado} - CEP: ${cep}`;

		return enderecoCompleto;
	}

}
