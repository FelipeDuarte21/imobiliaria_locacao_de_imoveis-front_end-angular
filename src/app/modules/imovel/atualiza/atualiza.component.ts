import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';

import { DesmascaraCEPPipe } from 'src/app/shared/pipes/desmascara-cep.pipe';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CepPipe } from 'src/app/shared/pipes/cep.pipe';
import { Pessoa } from 'src/app/models/pessoa.model';
import { ImovelDados } from 'src/app/models/imovel-dados.model';
import { ImovelService } from 'src/app/services/imovel.service';
import { EnderecoAPIService } from 'src/app/services/endereco-api.service';

@Component({
	selector: 'atualiza',
	templateUrl: './atualiza.component.html',
	styleUrls: ['./atualiza.component.css'],
	providers: [DesmascaraCEPPipe, CepPipe]
})
export class AtualizaComponent implements OnInit {

	//public maskCEP = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

	public formulario: UntypedFormGroup;

	public proprietarios: Array<Pessoa>;

	private idImovel: number;
	private imovel: ImovelDados;

	public sucesso: boolean = false;
	public erro: boolean = false;

	private inscricao: Subscription;

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private imovelService: ImovelService,
		private enderecoAPIService: EnderecoAPIService,
		private cepDesmasc: DesmascaraCEPPipe,
		private cepMask: CepPipe) { }

	ngOnInit() {
		
		this.inscricao = this.route.params.subscribe({
			next: params => {
				this.idImovel = params['id'];
				this.buscarPorId(this.idImovel);
			}
		});
		
		/* REVER
		this.imovelService.buscarTodosProprietarios().subscribe({
			next: proprietarios => {
				this.proprietarios = proprietarios.content;
			}
		});*/
		
		this.formulario = this.fb.group({
			idImovel: [null, [Validators.required]],
			proprietario: [{ value: '', disabled: true }, [Validators.required]],
			preco: [null, [Validators.required, Validators.min(0.01)]],
			tipo: [null, [Validators.required, Validators.maxLength(100)]],
			descricao: [null, [Validators.required]],
			endereco: this.fb.group({
				cep: [null, [Validators.required, Validators.pattern("\\d{2}.\\d{3}-\\d{3}")]],
				estado: [null, [Validators.required, Validators.maxLength(2)]],
				cidade: [null, [Validators.required, Validators.maxLength(50)]],
				bairro: [null, [Validators.required, Validators.maxLength(50)]],
				logradouro: [null, [Validators.required, Validators.maxLength(100)]],
				numero: [null, [Validators.required, Validators.maxLength(10)]],
				complemento: [null]
			})
		});

	}

	buscarPorId(id: number) {

		this.imovelService.buscarPorId(id).subscribe({
			next: res => {

				let complemento = res.endereco.complemento;
	
				this.formulario.patchValue({
					idImovel: res.id,
					proprietario: 0, //PESQUISAR
					preco: res.preco,
					tipo: res.tipo,
					descricao: res.descricao,
					endereco: {
						cep: this.cepMask.transform(res.endereco.cep),
						estado: res.endereco.estado,
						cidade: res.endereco.cidade,
						bairro: res.endereco.bairro,
						logradouro: res.endereco.logradouro,
						complemento: complemento,
						numero: res.endereco.numero
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

			this.setImovelModel();

			this.imovelService.atualizar(this.idImovel, this.imovel).subscribe(res => {

				this.sucesso = true;

				this.formulario.reset();

			}, error => {

				this.erro = true;

				console.log(error);

			});

		} else {

			this.verificaCamposFormulario(this.formulario);

		}

	}

	private setImovelModel() {

		let dados = this.formulario.value;

		this.imovel = {
			id: dados.idImovel,
			preco: dados.preco,
			tipo: dados.tipo,
			descricao: dados.descricao,
			endereco: {
				logradouro: dados.endereco.logradouro,
				cep: this.cepDesmasc.transform(dados.endereco.cep),
				complemento: (dados.endereco.complemento != "") ? dados.endereco.complemento : null,
				bairro: dados.endereco.bairro,
				cidade: dados.endereco.cidade,
				estado: dados.endereco.estado,
				numero: dados.endereco.numero
			},
			idProprietario: this.formulario.get('proprietario').value
		};

	}

	ngOnDestroy() {
		this.inscricao.unsubscribe();
	}

}
