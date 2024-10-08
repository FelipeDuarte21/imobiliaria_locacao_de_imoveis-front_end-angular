import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { LocacaoService } from 'src/app/backend/locacao.service';

import { Pessoa } from 'src/app/backend/models/pessoa.model';
import { Imovel } from 'src/app/backend/models/imovel.model';

import { LocacaoDTO } from 'src/app/backend/models/locacao.dto.model';


@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public formulario: UntypedFormGroup;

  public proprietarios:Array<Pessoa>;
  public inquilinos:Array<Pessoa>;
  public imoveis:Array<Imovel>;

  private locacao:LocacaoDTO;

  public sucesso: boolean = false;
  public erro: boolean = false;

  constructor(
    private locacaoService:LocacaoService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit() {

    this.formulario = this.fb.group({
      inquilino: [null,[Validators.required]],
      proprietario: [null, [Validators.required]],
      imovel: [null,[Validators.required]],
      preco: [null,[Validators.required,Validators.min(0.01)]],
      data: [{value: new Date(), disabled: true},[Validators.required]],
      tempo: [null,[Validators.required,Validators.min(3)]],
      dataInicio: [{value: new Date()},[Validators.required]],
      dataTermino: [{value: null, disabled: true},[Validators.required]]
    });

    this.mostrarDataHoje();

    this.locacaoService.buscarProprietarios().subscribe(prop => {
      this.proprietarios = prop;
    });

    this.locacaoService.buscarInquilinos().subscribe(inq => {
      this.inquilinos = inq;
    });

  } 

  private mostrarDataHoje(){

    let dataObj = new Date();
    let dia = (dataObj.getDate() < 10) ? `0${dataObj.getDay()}` : dataObj.getDate();
    let mes = ((dataObj.getMonth()+1) < 10) ? `0${dataObj.getMonth()+1}` : dataObj.getMonth()+1;
    let dataHoje = `${dataObj.getFullYear()}-${mes}-${dia}`;

    this.formulario.patchValue({
      data: dataHoje,
      dataInicio: dataHoje
    });

  }

  public onChangeImovel(idImovel:string){

    this.imoveis.forEach(imovel => {
      if(imovel.idImovel == idImovel){
        this.formulario.patchValue({
          preco: imovel.preco
        });
      }
    })

  }

  public onChangeProp(idProp:string){    
   
    this.locacaoService.buscarImoveisDisponiveisPorProprietario(idProp).subscribe(imoveis => {
      this.imoveis = imoveis;
    });

  }

  onChangeTempo(tempo:string){

    let data = new Date(`${this.formulario.get('dataInicio').value} 00:00:00`);
    
    data.setMonth(parseInt(data.getMonth().toString()) + parseInt(tempo));
    
    let dia = (data.getDate() < 10) ? `0${data.getDay()}` : data.getDate();
    let mes = ((data.getMonth()+1) < 10) ? `0${data.getMonth()+1}` : data.getMonth()+1;
    let dataFormata = `${data.getFullYear()}-${mes}-${dia}`;

    this.formulario.patchValue({
      dataTermino: dataFormata
    });

  }

  validarCampo(campo:string): boolean{
    return this.formulario.get(campo).invalid && this.formulario.get(campo).touched;
  }

  getClassErro(campo:any){
    
    return {
      'is-invalid': this.validarCampo(campo)
    };
    
  }

  private verificaCamposFormulario(formGroup: UntypedFormGroup){

    Object.keys(formGroup.controls).forEach(campo => {

      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if(controle instanceof UntypedFormGroup){
        this.verificaCamposFormulario(controle);
      }

    });

  }

  onSubmit(){

    if(this.formulario.valid){

      this.setLocacaoModel();

      this.locacaoService.alugar(this.locacao).subscribe(res => {

        this.sucesso = true;

        this.formulario.reset();

        this.mostrarDataHoje();
  
      }, error => {
        
        this.erro = true;
        
        console.log(error);

      });

      console.log(this.locacao);

    }else{

      this.verificaCamposFormulario(this.formulario);

    }

  }

  public setLocacaoModel(){

    let dados = this.formulario.value;
  
    this.locacao = {
      idLocacao: null,
      data: this.formulario.get('data').value,
      tempo: dados.tempo,
      dataInicio: dados.dataInicio,
      dataTermino:this.formulario.get('dataTermino').value,
      valor: dados.preco,
      idImovel: dados.imovel,
      idInquilino: dados.inquilino
    };

  }

  reset(){
    this.formulario.reset();

    this.mostrarDataHoje();
  } 

}
