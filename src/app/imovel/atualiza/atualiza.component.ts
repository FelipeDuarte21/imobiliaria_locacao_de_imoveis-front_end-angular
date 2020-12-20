import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pessoa } from 'src/app/backend/models/pessoa.model';
import { ImovelService } from 'src/app/backend/imovel.service';
import { DesmascaraCEPPipe } from 'src/app/pipes/desmascara-cep.pipe';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CepPipe } from 'src/app/pipes/cep.pipe';
import { ImovelDTO } from 'src/app/backend/models/imovel.dto.model';

@Component({
  selector: 'atualiza',
  templateUrl: './atualiza.component.html',
  styleUrls: ['./atualiza.component.css'],
  providers: [ DesmascaraCEPPipe, CepPipe]
})
export class AtualizaComponent implements OnInit {

  public maskCEP = [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];

  public formulario: FormGroup;

  public proprietarios:Array<Pessoa>;

  private imovel:ImovelDTO;
  private proprietario:string;

  public sucesso:boolean = false;
  public erro:boolean = false;

  private inscricao:Subscription;

  constructor(
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private imovelService:ImovelService,
    private cepDesmasc: DesmascaraCEPPipe,
    private cepMask: CepPipe) { }

  ngOnInit() {

    this.formulario = this.fb.group({
      idImovel: [null,[Validators.required]],
      proprietario: [{value: '', disabled: true},[Validators.required]],
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

    this.imovelService.buscarTodosProprietarios().subscribe(res => {
      this.proprietarios = res;
    });

    this.inscricao = this.route.params.subscribe(
      (params:any) => {
        this.buscarPorId(params["id"]);
      }
    );
  }

  buscarPorId(id:string){

    this.imovelService.buscarPorId(id).subscribe(res => {

      let complemento = "";
      if(res.endereco.logradouroCep.complemento){
        complemento = res.endereco.logradouroCep.complemento.complemento;
      }
  
      this.formulario.patchValue({
        idImovel: res.idImovel,
        proprietario: res.proprietario.idPessoa,
        preco: res.preco,
        tipo: res.tipo,
        descricao: res.descricao,
        endereco: {
          cep: this.cepMask.transform(res.endereco.logradouroCep.cep), 
          estado: res.endereco.logradouroCep.bairro.cidade.estado.nome, 
          cidade: res.endereco.logradouroCep.bairro.cidade.nome, 
          bairro: res.endereco.logradouroCep.bairro.nome,
          logradouro: res.endereco.logradouroCep.logradouro,
          complemento: complemento,
          numero: res.endereco.numero.numero
        }
      });

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

      this.imovelService.atualizar(this.imovel).subscribe(res => {

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
      idImovel: dados.idImovel,
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
        numero: dados.endereco.numero
      },
      idProprietario: this.formulario.get('proprietario').value
    };

  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
