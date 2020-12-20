import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import { ImovelService } from 'src/app/backend/imovel.service';
import { Pessoa } from 'src/app/backend/models/pessoa.model';
import { DesmascaraCEPPipe } from 'src/app/pipes/desmascara-cep.pipe';
import { ImovelDTO } from 'src/app/backend/models/imovel.dto.model';

@Component({
  selector: 'cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [ DesmascaraCEPPipe]
})
export class CadastroComponent implements OnInit {

  public maskCEP = [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];

  public formulario: FormGroup;

  public proprietarios:Array<Pessoa>;

  private imovel:ImovelDTO;

  public sucesso:boolean = false;
  public erro:boolean = false;

  constructor(
    private fb:FormBuilder,
    private imovelService:ImovelService,
    private cepDesmasc: DesmascaraCEPPipe
  ) { }

  ngOnInit() {

    this.imovelService.buscarTodosProprietarios().subscribe(res => {
      this.proprietarios = res;
    });

    this.formulario = this.fb.group({
      proprietario: [null,[Validators.required]],
      preco: [null,[Validators.required,Validators.min(0.01)]],
      tipo: [null,[Validators.required,Validators.maxLength(100)]],
      descricao: [null, [Validators.required]],
      endereco: this.fb.group({
        cep: [null, [Validators.required,Validators.pattern("\\d{2}.\\d{3}-\\d{3}")]],
        estado: [null,[Validators.required,Validators.maxLength(2)]],
        cidade: [null, [Validators.required,Validators.maxLength(50)]],
        bairro: [null, [Validators.required,Validators.maxLength(50)]],
        logradouro: [null, [Validators.required,Validators.maxLength(100)]] ,
        numero: [null, [Validators.required, Validators.maxLength(10)]],
        complemento: [null]
      })
    });
  }

  buscarPorCep(){

    let cep = this.formulario.get('endereco.cep').value;

    cep = this.cepDesmasc.transform(cep);

    this.imovelService.buscarPorCep(cep).subscribe(endereco => {
      this.formulario.patchValue({
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

  validarCampo(campo:string): boolean{
    return this.formulario.get(campo).invalid && this.formulario.get(campo).touched;
  }

  getClassErro(campo:any){
    
    return {
      'is-invalid': this.validarCampo(campo)
    };
    
  }

  private verificaCamposFormulario(formGroup: FormGroup){

    Object.keys(formGroup.controls).forEach(campo => {

      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if(controle instanceof FormGroup){
        this.verificaCamposFormulario(controle);
      }

    });

  }

  onSubmit(){

    if(this.formulario.valid){

      this.setImovelModel();

      this.imovelService.cadastrar(this.imovel).subscribe(res => {

        this.sucesso = true;

        this.formulario.reset();
  
      }, error => {
        
        this.erro = true;
        
        console.log(error);

      });

    }else{

      this.verificaCamposFormulario(this.formulario);

    }

  }

  private setImovelModel(){

    let dados = this.formulario.value;

    this.imovel = {
      idImovel: null,
      preco: dados.preco,
      tipo: dados.tipo,
      descricao: dados.descricao,
      endereco: {
        logradouro: dados.endereco.logradouro,
        cep: this.cepDesmasc.transform(dados.endereco.cep),
        complemento: (dados.endereco.complemento != "") ? dados.endereco.complemento: null,
        bairro: dados.endereco.bairro,
        cidade: dados.endereco.cidade,
        estado: dados.endereco.estado,
        numero: dados.endereco.numero,
      },
      idProprietario: dados.proprietario
    };

  }

} 
