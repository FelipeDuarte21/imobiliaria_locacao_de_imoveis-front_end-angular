import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { Imovel } from 'src/app/models/imovel.model';
import { LocacaoDados } from 'src/app/models/locacao-dados.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { LocacaoService } from 'src/app/services/locacao.service';

@Component({
	selector: 'cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

	public formulario: UntypedFormGroup;

	public proprietarios: Array<Pessoa>;
	public inquilinos: Array<Pessoa>;
	public imoveis: Array<Imovel>;

	private locacao: LocacaoDados;

	public sucesso: boolean = false;
	public erro: boolean = false;

	constructor(
		private locacaoService: LocacaoService,
		private fb: FormBuilder
	) { }

	ngOnInit() {

		this.formulario = this.fb.group({
			inquilino: [null, [Validators.required]],
			proprietario: [null, [Validators.required]],
			imovel: [null, [Validators.required]],
			preco: [null, [Validators.required, Validators.min(0.01)]],
			data: [{ value: new Date(), disabled: true }, [Validators.required]],
			tempo: [null, [Validators.required, Validators.min(3)]],
			dataInicio: [{ value: new Date() }, [Validators.required]],
			dataTermino: [{ value: null, disabled: true }, [Validators.required]]
		});

		this.mostrarDataHoje();

		/* REVER
		this.locacaoService.buscarProprietarios().subscribe({
			next: proprietarios => {
				this.proprietarios = proprietarios.content;
			}
		});
		
		this.locacaoService.buscarInquilinos().subscribe({
			next: inquilinos => {
				this.inquilinos = inquilinos.content;
			}
		});*/
		
	}

	private mostrarDataHoje() {

		let dataObj = new Date();
		let dia = (dataObj.getDate() < 10) ? `0${dataObj.getDay()}` : dataObj.getDate();
		let mes = ((dataObj.getMonth() + 1) < 10) ? `0${dataObj.getMonth() + 1}` : dataObj.getMonth() + 1;
		let dataHoje = `${dataObj.getFullYear()}-${mes}-${dia}`;

		this.formulario.patchValue({
			data: dataHoje,
			dataInicio: dataHoje
		});

	}

	public onChangeImovel(idImovel: number) {

		this.imoveis.forEach(imovel => {
			if (imovel.id == idImovel) {
				this.formulario.patchValue({
					preco: imovel.preco
				});
			}
		})

	}

	public onChangeProp(idProp: string) {

		/* REVER
		this.locacaoService.buscarImoveisDisponiveisPorProprietario(idProp).subscribe();imoveis => {
			this.imoveis = imoveis;
		});*/

	}

	onChangeTempo(tempo: string) {

		let data = new Date(`${this.formulario.get('dataInicio').value} 00:00:00`);

		data.setMonth(parseInt(data.getMonth().toString()) + parseInt(tempo));

		let dia = (data.getDate() < 10) ? `0${data.getDay()}` : data.getDate();
		let mes = ((data.getMonth() + 1) < 10) ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
		let dataFormata = `${data.getFullYear()}-${mes}-${dia}`;

		this.formulario.patchValue({
			dataTermino: dataFormata
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

			this.setLocacaoModel();

			this.locacaoService.alugar(this.locacao).subscribe({
				next: res => {
					this.sucesso = true;
					this.formulario.reset();
					this.mostrarDataHoje();
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

	public setLocacaoModel() {

		let dados = this.formulario.value;

		this.locacao = {
			id: null,
			data: this.formulario.get('data').value,
			tempo: dados.tempo,
			dataInicio: dados.dataInicio,
			dataTermino: this.formulario.get('dataTermino').value,
			valor: dados.preco,
			idImovel: dados.imovel,
			idInquilino: dados.inquilino
		};

	}

	reset() {
		this.formulario.reset();
		this.mostrarDataHoje();
	}

}
