import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CepPipe } from 'src/app/shared/pipes/cep.pipe';
import { FormataDataPipe } from 'src/app/shared/pipes/formata-data.pipe';
import { FormataEstadoCivilPipe } from 'src/app/shared/pipes/formata-estado-civil.pipe';
import { CelularPipe } from 'src/app/shared/pipes/celular.pipe';
import { TelefonePipe } from 'src/app/shared/pipes/telefone.pipe';
import { DesmascaraCEPPipe } from 'src/app/shared/pipes/desmascara-cep.pipe';
import { DesmascaraCPFPipe } from 'src/app/shared/pipes/desmascara-cpf.pipe';
import { DesmascaraCelularPipe } from 'src/app/shared/pipes/desmascara-celular.pipe';
import { DesmascaraTelefonePipe } from 'src/app/shared/pipes/desmascara-telefone.pipe';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';

import { Subscription } from 'rxjs';
import { PessoaDados } from 'src/app/models/pessoa-dados.model';
import { ProprietarioService } from 'src/app/services/proprietario.service';
import { EnderecoAPIService } from 'src/app/services/endereco-api.service';

@Component({
	selector: 'atualiza',
	templateUrl: './atualiza.component.html',
	styleUrls: ['./atualiza.component.css'],
	providers: [CepPipe, FormataDataPipe, FormataEstadoCivilPipe, CelularPipe, TelefonePipe,
		DesmascaraCEPPipe, DesmascaraCPFPipe, DesmascaraTelefonePipe, DesmascaraCelularPipe, CpfPipe]
})
export class AtualizaComponent implements OnInit {

	/*
	public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
	public maskCEP = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
	public maskCelular = ['(', /\d/, /\d/, ')', ' ', '9', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	public maskTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	*/

	public formulario: FormGroup;

	private id: number;
	private prop: PessoaDados;

	private inscricao: Subscription;

	public sucesso: boolean = false;
	public erro: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private formBuild: FormBuilder,
		private proprietarioService: ProprietarioService,
		private enderecoAPIService: EnderecoAPIService,
		private cepMasc: CepPipe,
		private FormataData: FormataDataPipe,
		private FormataEstadoCivil: FormataEstadoCivilPipe,
		private Celular: CelularPipe,
		private Telefone: TelefonePipe,
		private cepDesmasc: DesmascaraCEPPipe,
		private cpfDesmasc: DesmascaraCPFPipe,
		private celDesmasc: DesmascaraCelularPipe,
		private telDesmasc: DesmascaraTelefonePipe,
		private cpfMask: CpfPipe
	) { }

	ngOnInit() {

		this.inscricao = this.route.params.subscribe({
			next: params => {
				this.id = params['id'];
				this.buscarPorId(params['id']);
			}
		});
			
		this.formulario = this.formBuild.group({
			id: [null],
			cpf: [null, [Validators.required, Validators.pattern("\\d{3}.\\d{3}.\\d{3}-\\d{2}")]],
			nome: [null, [Validators.required, Validators.maxLength(50)]],
			nacionalidade: [null, [Validators.required, Validators.maxLength(50)]],
			dataNascimento: [null, [Validators.required]],
			estadoCivil: [null, [Validators.required]],
			identidade: [null, [Validators.required, Validators.maxLength(50)]],
			orgaoEmissor: [null, [Validators.required, Validators.maxLength(30)]],
			dataExpedicao: [null, [Validators.required]],
			endereco: this.formBuild.group({
				cep: [null, [Validators.required, Validators.pattern("\\d{2}.\\d{3}-\\d{3}")]],
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
				celular: [null, [Validators.required, Validators.pattern("\\(\\d{2}\\)\\s\\9\\d{4}-\\d{4}")]],
				idTelefone: [null],
				telefone: [null, [Validators.required, Validators.pattern("\\(\\d{2}\\)\\s\\d{4}-\\d{4}")]]
			})
		});
	}

	buscarPorId(id: number) {

		this.proprietarioService.getPorId(id).subscribe({
			next: proprietario => {

				let complemento = proprietario.endereco.complemento;
				let idTelefoneVal = '';
				let telefoneVal = '';
				let idCelularVal = '';
				let celularVal = '';

				proprietario.contatos.forEach(contato => {
					if (contato.tipo === 'Telefone') {
						idTelefoneVal = contato.id.toString();
						telefoneVal = this.Telefone.transform(contato.numero)
					}
					if (contato.tipo === "Celular") {
						idCelularVal = contato.id.toString();
						celularVal = this.Celular.transform(contato.numero)
					}
				});
	
				this.formulario.patchValue({
					id: proprietario.id,
					cpf: this.cpfMask.transform(proprietario.cpf),
					nome: proprietario.nome,
					nacionalidade: proprietario.nacionalidade,
					dataNascimento: this.FormataData.transform(proprietario.dataNascimento),
					estadoCivil: this.FormataEstadoCivil.transform(proprietario.estadoCivil),
					identidade: proprietario.identidade,
					orgaoEmissor: proprietario.orgaoEmissor,
					dataExpedicao: this.FormataData.transform(proprietario.dataExpedicao),
					endereco: {
						cep: this.cepMasc.transform(proprietario.endereco.cep),
						estado: proprietario.endereco,
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

		let cep = this.formulario.get('endereco.cep').value;

		cep = this.cepDesmasc.transform(cep);

		this.enderecoAPIService.buscarPorCep(cep).subscribe({
			next: endereco => {
				this.formulario.patchValue({
					endereco: {
						estado: endereco.uf,
						cidade: endereco.localidade,
						bairro: endereco.bairro,
						logradouro: endereco.logradouro,
						complemento: endereco.complemento
					}
				});
			}
		});
		
	}

	validarCampo(campo: string): boolean {
		return this.formulario.get(campo).invalid && this.formulario.get(campo).touched;
	}

	getClassErro(campo: any) {

		return {
			'is-invalid': this.validarCampo(campo)
		};

	}

	private verificaCamposFormulario(formGroup: UntypedFormGroup) {

		Object.keys(formGroup.controls).forEach(campo => {

			const controle = formGroup.get(campo);
			controle.markAsTouched();
			if (controle instanceof UntypedFormGroup) {
				this.verificaCamposFormulario(controle);
			}

		});

	}

	onSubmit() {

		if (this.formulario.valid) {

			this.setProprietarioModel();

			this.proprietarioService.atualizar(this.id, this.prop).subscribe({
				next: res => {
					this.sucesso = true;
					this.formulario.reset();
				},
				error: error => {
					this.erro = true;
					console.log(error);
				}
			});
			
		} else {

			this.verificaCamposFormulario(this.formulario);

		}

	}

	private setProprietarioModel() {

		let dados = this.formulario.value;

		this.prop = {
			id: (dados.idPessoa === '0') ? null : dados.idPessoa,
			tipoPessoa: 2,
			nome: dados.nome,
			nacionalidade: dados.nacionalidade,
			estadoCivil: dados.estadoCivil,
			dataNascimento: dados.dataNascimento,
			identidade: dados.identidade,
			orgaoEmissor: dados.orgaoEmissor,
			dataExpedicao: dados.dataExpedicao,
			cpf: this.cpfDesmasc.transform(dados.cpf),
			email: dados.contatos.email,
			salario: 0,
			contatos: [
				{
					id: (dados.idPessoa === '0') ? null : dados.contatos.idTelefone,
					tipoContato: 1,
					numero: this.telDesmasc.transform(dados.contatos.telefone)
				},
				{
					id: (dados.idPessoa === '0') ? null : dados.contatos.idCelular,
					tipoContato: 2,
					numero: this.celDesmasc.transform(dados.contatos.celular)
				}
			],
			endereco: {
				cep: this.cepDesmasc.transform(dados.endereco.cep),
				logradouro: dados.endereco.logradouro,
				complemento: (dados.endereco.complemento != "") ? dados.endereco.complemento : null,
				bairro: dados.endereco.bairro,
				cidade: dados.endereco.cidade,
				estado: dados.endereco.estado,
				numero: dados.endereco.numero,
			},

		};

	}

	ngOnDestroy() {
		this.inscricao.unsubscribe();
	}

} 
