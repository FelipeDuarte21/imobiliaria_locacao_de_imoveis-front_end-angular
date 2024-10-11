import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { FormataDataPipe } from 'src/app/shared/pipes/formata-data.pipe';
import { Pessoa } from 'src/app/models/pessoa.model';
import { Imovel } from 'src/app/models/imovel.model';
import { LocacaoDados } from 'src/app/models/locacao-dados.model';
import { LocacaoService } from 'src/app/services/locacao.service';

@Component({
	selector: 'atualiza',
	templateUrl: './atualiza.component.html',
	styleUrls: ['./atualiza.component.css'],
	providers: [FormataDataPipe]
})
export class AtualizaComponent implements OnInit {

	public formulario: UntypedFormGroup;

	public sucesso: boolean = false;
	public erro: boolean = false;

	public proprietarios: Array<Pessoa>;
	public inquilinos: Array<Pessoa>;
	public imoveis: Array<Imovel>;

	private id: number;
	private locacao: LocacaoDados;

	constructor(
		private route: ActivatedRoute,
		private locacaoService: LocacaoService,
		private fb: FormBuilder,
		private formataData: FormataDataPipe) { }

	ngOnInit() {
		
		this.route.params.subscribe((params: any) => {
			this.id = params['id'];
			this.buscarPorId(params["id"]);
		});

		this.formulario = this.fb.group({
			id: [null, [Validators.required]],
			inquilino: [{ value: null, disabled: true }, [Validators.required]],
			proprietario: [{ value: null, disabled: true }, [Validators.required]],
			imovel: [{ value: null, disabled: true }, [Validators.required]],
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

	public buscarPorId(id: number) {

		this.locacaoService.buscarPorId(id).subscribe({
			next: loc => {

				let idProp = 0 //REVER;

				/* REVER
				this.locacaoService.buscarImoveisProprietarioPorId(idProp).subscribe(imoveis => {
					this.imoveis = imoveis;
				});*/
	
				this.formulario.patchValue({
					idLocacao: loc.id,
					inquilino: 0, //REVER
					proprietario: 0, //REVER
					imovel: loc.imovel.id,
					preco: loc.valor,
					data: this.formataData.transform(loc.data),
					tempo: loc.tempo,
					dataInicio: this.formataData.transform(loc.dataInicio),
					dataTermino: this.formataData.transform(loc.dataTermino)
				});

			}
		}) 
		
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

		if (this.formulario.valid) {

			this.setLocacaoModel();

			this.locacaoService.atualizar(this.id, this.locacao).subscribe({
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
			id: dados.idLocacao,
			data: this.formulario.get('data').value,
			tempo: dados.tempo,
			dataInicio: dados.dataInicio,
			dataTermino: this.formulario.get('dataTermino').value,
			valor: dados.preco,
			idImovel: this.formulario.get('imovel').value,
			idInquilino: this.formulario.get('inquilino').value
		};

	}

	reset() {
		this.formulario.reset();
		this.mostrarDataHoje();
	}

} 
