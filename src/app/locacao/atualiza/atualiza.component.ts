import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocacaoService } from 'src/app/backend/locacao.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormataDataPipe } from 'src/app/pipes/formata-data.pipe';
import { Pessoa } from 'src/app/backend/models/pessoa.model';
import { Imovel } from 'src/app/backend/models/imovel.model';
import { LocacaoDTO } from 'src/app/backend/models/locacao.dto.model';

@Component({
  selector: 'atualiza',
  templateUrl: './atualiza.component.html',
  styleUrls: ['./atualiza.component.css'],
  providers: [FormataDataPipe]
})
export class AtualizaComponent implements OnInit {

  public formulario: UntypedFormGroup;

  public sucesso:boolean = false;
  public erro:boolean = false;

  public proprietarios: Array<Pessoa>;
  public inquilinos: Array<Pessoa>;
  public imoveis: Array<Imovel>;

  private locacao:LocacaoDTO;

  constructor(
    private route: ActivatedRoute,
    private locacaoService:LocacaoService,
    private fb: UntypedFormBuilder,
    private formataData: FormataDataPipe) { }

  ngOnInit() {

    this.formulario = this.fb.group({
      idLocacao: [null,[Validators.required]],
      inquilino: [{value: null, disabled: true},[Validators.required]],
      proprietario: [{value: null, disabled: true}, [Validators.required]],
      imovel: [{value: null, disabled: true},[Validators.required]],
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

    this.route.params.subscribe((params:any) => {
      this.buscarPorId(params["id"]);
    });

  } 

  public buscarPorId(id:string){
    this.locacaoService.buscarPorId(id).subscribe(loc => {

      let idProp = `${loc.imovel.proprietario.idPessoa}`;

      this.locacaoService.buscarImoveisProprietarioPorId(idProp).subscribe(imoveis => {
        this.imoveis = imoveis;
      });

      this.formulario.patchValue({
        idLocacao: loc.idLocacao,
        inquilino: loc.inquilino.idPessoa,
        proprietario: loc.imovel.proprietario.idPessoa,
        imovel: loc.imovel.idImovel,
        preco: loc.valor,
        data: this.formataData.transform(loc.data),
        tempo: loc.tempo,
        dataInicio: this.formataData.transform(loc.dataInicio),
        dataTermino: this.formataData.transform(loc.dataTermino)
      });

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

      this.locacaoService.atualizar(this.locacao).subscribe(res => {

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
      idLocacao: dados.idLocacao,
      data: this.formulario.get('data').value,
      tempo: dados.tempo,
      dataInicio: dados.dataInicio,
      dataTermino: this.formulario.get('dataTermino').value,
      valor: dados.preco,
      idImovel: this.formulario.get('imovel').value ,
      idInquilino: this.formulario.get('inquilino').value
    };

  }

  reset(){
    this.formulario.reset();

    this.mostrarDataHoje();
  } 

} 
