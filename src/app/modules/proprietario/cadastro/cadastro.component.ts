import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormataDataPipe } from 'src/app/shared/pipes/formata-data.pipe';
import { FormataEstadoCivilPipe } from 'src/app/shared/pipes/formata-estado-civil.pipe';

import { PessoaDados } from 'src/app/models/pessoa-dados.model';

import { ProprietarioService } from 'src/app/services/proprietario.service';
import { EnderecoAPIService } from 'src/app/services/endereco-api.service';

@Component({
	selector: 'cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css'],
	providers: [FormataDataPipe, FormataEstadoCivilPipe]
})
export class CadastroComponent implements OnInit {

	public formCadastro: FormGroup;

	private prop: PessoaDados;

	public sucesso: boolean = false;
	public erro: boolean = false;

	constructor(
		private formBuild: FormBuilder,
		private proprietarioService: ProprietarioService,
		private enderecoAPIService: EnderecoAPIService,
		private FormataData: FormataDataPipe,
		private FormataEstadoCivil: FormataEstadoCivilPipe,
	) { }

	ngOnInit() {
		this.formCadastro = this.formBuild.group({
			id: ['0'],
			nome: [null, [Validators.required, Validators.maxLength(50)]],
			nacionalidade: [null, [Validators.required, Validators.maxLength(50)]],
			estadoCivil: [null, [Validators.required]],
			dataNascimento: [null, [Validators.required]],
			identidade: [null, [Validators.required, Validators.maxLength(50)]],
			orgaoEmissor: [null, [Validators.required, Validators.maxLength(30)]],
			dataExpedicao: [null, [Validators.required]],
			cpf: [null, [Validators.required]],
			endereco: this.formBuild.group({
				cep: [null, [Validators.required]],
				estado: [null, [Validators.required, Validators.maxLength(2)]],
				cidade: [null, [Validators.required, Validators.maxLength(50)]],
				bairro: [null, [Validators.required, Validators.maxLength(50)]],
				logradouro: [null, [Validators.required, Validators.maxLength(100)]],
				numero: [null, [Validators.required, Validators.maxLength(10)]],
				complemento: [null]
			}),
			contatos: this.formBuild.group({
				email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
				idCelular: [null],
				celular: [null, [Validators.required]],
				idTelefone: [null],
				telefone: [null, [Validators.required]]
			})
		});
	}

	buscarPorCPF() {

		let cpf = this.formCadastro.get('cpf').value;

		this.proprietarioService.getPorCPF(cpf).subscribe({
			next: proprietario => {

				if(proprietario == null) return;

				let complemento = proprietario.endereco.complemento;
				let idTelefoneVal = '';
				let telefoneVal = '';
				let idCelularVal = '';
				let celularVal = '';

				proprietario.contatos.forEach(contato => {

					if (contato.tipo === 'Telefone') {
						idTelefoneVal = contato.id.toString();
						telefoneVal = contato.numero
					}

					if (contato.tipo === "Celular") {
						idCelularVal = contato.id.toString();
						celularVal = contato.numero
					}

				});

				this.formCadastro.patchValue({
					idPessoa: proprietario.id,
					nome: proprietario.nome,
					nacionalidade: proprietario.nacionalidade,
					dataNascimento: this.FormataData.transform(proprietario.dataNascimento),
					estadoCivil: this.FormataEstadoCivil.transform(proprietario.estadoCivil),
					identidade: proprietario.identidade,
					orgaoEmissor: proprietario.orgaoEmissor,
					dataExpedicao: this.FormataData.transform(proprietario.dataExpedicao),
					endereco: {
						cep: proprietario.endereco.cep,
						estado: proprietario.endereco.estado,
						cidade: proprietario.endereco.cidade,
						bairro: proprietario.endereco.bairro,
						logradouro: proprietario.endereco.logradouro,
						complemento: complemento,
						numero: proprietario.endereco.numero
					},
					contatos: {
						email: proprietario.email,
						idTelefone: idTelefoneVal,
						telefone: telefoneVal,
						idCelular: idCelularVal,
						celular: celularVal
					}
				});

			}
		});
		
	}

	buscarPorCep() {

		let cep = this.formCadastro.get('endereco.cep').value;

		this.enderecoAPIService.buscarPorCep(cep).subscribe(endereco => {
			this.formCadastro.patchValue({
				endereco: {
					estado: endereco.uf,
					cidade: endereco.localidade,
					bairro: endereco.bairro,
					logradouro: endereco.logradouro,
					complemento: endereco.complemento
				}
			});
		});

	}

	validarCampo(campo: string): boolean {
		return this.formCadastro.get(campo).invalid && this.formCadastro.get(campo).touched;
	}

	getClassErro(campo: any) {

		return {
			'is-invalid': this.validarCampo(campo)
		};

	}

	private verificaCamposFormulario(formGroup: FormGroup) {

		Object.keys(formGroup.controls).forEach(campo => {

			const controle = formGroup.get(campo);
			controle.markAsTouched();
			if (controle instanceof FormGroup) {
				this.verificaCamposFormulario(controle);
			}

		});

	}

	onSubmit() {

		if (this.formCadastro.valid) {

			this.setProprietarioModel();
			console.log(this.prop);

			this.proprietarioService.cadastrar(this.prop).subscribe({
				next: res => {
					this.sucesso = true;
					this.formCadastro.reset();
				},
				error: error => {
					this.erro = true;
					console.log(error);
				}
			});
			
		} else {

			this.verificaCamposFormulario(this.formCadastro);

		}

	}

	private setProprietarioModel() {

		let dados = this.formCadastro.value;

		this.prop = {
			id: (dados.idPessoa === '0') ? null : dados.id,
			tipoPessoa: 2,
			nome: dados.nome,
			nacionalidade: dados.nacionalidade,
			estadoCivil: dados.estadoCivil,
			dataNascimento: dados.dataNascimento,
			identidade: dados.identidade,
			orgaoEmissor: dados.orgaoEmissor,
			dataExpedicao: dados.dataExpedicao,
			cpf: dados.cpf,
			email: dados.contatos.email,
			salario: 0,
			contatos: [
				{
					id: (dados.idPessoa === '0') ? null : dados.contatos.idTelefone,
					tipoContato: 1,
					numero: dados.contatos.telefone
				},
				{
					id: (dados.idPessoa === '0') ? null : dados.contatos.idCelular,
					tipoContato: 2,
					numero: dados.contatos.celular
				}
			],
			endereco: {
				cep: dados.endereco.cep,
				logradouro: dados.endereco.logradouro,
				complemento: (dados.endereco.complemento != "") ? dados.endereco.complemento : null,
				bairro: dados.endereco.bairro,
				cidade: dados.endereco.cidade,
				estado: dados.endereco.estado,
				numero: dados.endereco.numero,
			},

		};

	}

}
