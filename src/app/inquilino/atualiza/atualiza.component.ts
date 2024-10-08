import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup,UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InquilinoService } from 'src/app/backend/inquilino.service';
import { CepPipe } from 'src/app/pipes/cep.pipe';
import { FormataDataPipe } from 'src/app/pipes/formata-data.pipe';
import { CelularPipe } from 'src/app/pipes/celular.pipe';
import { TelefonePipe } from 'src/app/pipes/telefone.pipe';
import { DesmascaraCEPPipe } from 'src/app/pipes/desmascara-cep.pipe';
import { DesmascaraCPFPipe } from 'src/app/pipes/desmascara-cpf.pipe';
import { DesmascaraCelularPipe } from 'src/app/pipes/desmascara-celular.pipe';
import { DesmascaraTelefonePipe } from 'src/app/pipes/desmascara-telefone.pipe';
import { Subscription, from } from 'rxjs';
import { FormataEstadoCivilPipe } from 'src/app/pipes/formata-estado-civil.pipe';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { PessoaDTO } from 'src/app/backend/models/pessoa.dto.model';

@Component({
  selector: 'atualiza',
  templateUrl: './atualiza.component.html',
  styleUrls: ['./atualiza.component.css'],
  providers: [CepPipe,FormataDataPipe,FormataEstadoCivilPipe,CelularPipe,TelefonePipe,
    DesmascaraCEPPipe,DesmascaraCPFPipe,DesmascaraTelefonePipe,DesmascaraCelularPipe,CpfPipe]
})
export class AtualizaComponent implements OnInit {

  public maskCPF = [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  public maskCEP = [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];
  public maskCelular = ['(',/\d/,/\d/,')',' ','9',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/];
  public maskTelefone = ['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/];

  public formulario:UntypedFormGroup;

  private inq:PessoaDTO;

  public sucesso:boolean = false;
  public erro:boolean = false;

  private inscricao:Subscription;

  constructor(
    private formBuild: UntypedFormBuilder,
    private route: ActivatedRoute, 
    private service: InquilinoService, 
    private cepMasc: CepPipe,
    private FormataData: FormataDataPipe,
    private FormataEstadoCivil: FormataEstadoCivilPipe,
    private Celular: CelularPipe,
    private Telefone: TelefonePipe,
    private cepDesmasc: DesmascaraCEPPipe,
    private cpfDesmasc: DesmascaraCPFPipe,
    private celDesmasc: DesmascaraCelularPipe,
    private telDesmasc: DesmascaraTelefonePipe,
    private cpfPipe: CpfPipe
  ) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params:any) => {
        this.buscarPorId(params["id"]);
      }
    );

    this.formulario = this.formBuild.group({
      idPessoa: [null],
      cpf: [null, [Validators.required,Validators.pattern("\\d{3}.\\d{3}.\\d{3}-\\d{2}")]],
      nome: [null, [Validators.required,Validators.maxLength(50)]],
      nacionalidade: [null, [Validators.required,Validators.maxLength(50)]],
      dataNascimento: [null, [Validators.required]],
      estadoCivil: [null, [Validators.required]] ,
      identidade: [null, [Validators.required,Validators.maxLength(50)]],
      orgaoEmissor: [null, [Validators.required, Validators.maxLength(30)]],
      dataExpedicao: [null, [Validators.required]],
      salario: [null,[Validators.required]],
      endereco: this.formBuild.group({
        cep: [null, [Validators.required,Validators.pattern("\\d{2}.\\d{3}-\\d{3}")]],
        estado: [null,[Validators.required,Validators.maxLength(2)]],
        cidade: [null, [Validators.required,Validators.maxLength(50)]],
        bairro: [null, [Validators.required,Validators.maxLength(50)]],
        logradouro: [null, [Validators.required,Validators.maxLength(100)]] ,
        numero: [null, [Validators.required, Validators.maxLength(10)]],
        complemento: [null]
      }),
      contatos: this.formBuild.group({
        email: [null, [Validators.required,Validators.email,Validators.maxLength(50)]],
        idCelular: [null],
        celular: [null, [Validators.required,Validators.pattern("\\(\\d{2}\\)\\s\\9\\d{4}-\\d{4}")]],
        idTelefone: [null],
        telefone: [null, [Validators.required,Validators.pattern("\\(\\d{2}\\)\\s\\d{4}-\\d{4}")]]
      })
    });
  }

  buscarPorId(id: string){

    this.service.getPorId(id).subscribe(inquilino => {

      let complemento = "";
      if(inquilino.endereco.logradouroCep.complemento){
        complemento = inquilino.endereco.logradouroCep.complemento.complemento;
      }

      let idTelefoneVal = '';
      let telefoneVal = '';
      let idCelularVal = '';
      let celularVal = '';
      inquilino.contatos.forEach(contato => {
        if(contato.tipoContato === 'Telefone'){
          idTelefoneVal = contato.idContato.toString();
          telefoneVal = this.Telefone.transform(contato.numero)
        }
        if(contato.tipoContato === "Celular"){
          idCelularVal = contato.idContato.toString();
          celularVal = this.Celular.transform(contato.numero)
        }
      });

      this.formulario.patchValue({
        idPessoa: inquilino.idPessoa,
        cpf: this.cpfPipe.transform(inquilino.cpf),
        nome: inquilino.nome, 
        nacionalidade: inquilino.nacionalidade, 
        dataNascimento: this.FormataData.transform(inquilino.dataNascimento), 
        estadoCivil: this.FormataEstadoCivil.transform(inquilino.estadoCivil), 
        identidade: inquilino.identidade, 
        orgaoEmissor: inquilino.orgaoEmissor, 
        dataExpedicao: this.FormataData.transform(inquilino.dataExpedicao),
        salario: inquilino.salario,
        endereco: { 
          cep: this.cepMasc.transform(inquilino.endereco.logradouroCep.cep), 
          estado: inquilino.endereco.logradouroCep.bairro.cidade.estado.nome, 
          cidade: inquilino.endereco.logradouroCep.bairro.cidade.nome, 
          bairro: inquilino.endereco.logradouroCep.bairro.nome,
          logradouro: inquilino.endereco.logradouroCep.logradouro,
          complemento: complemento,
          numero: inquilino.endereco.numero.numero
        },
        contatos: {
          email: inquilino.email,
          idTelefone: idTelefoneVal,
          telefone: telefoneVal,
          idCelular: idCelularVal,
          celular: celularVal
        }
      });
    });
  }

  buscarPorCep(){

    let cep = this.formulario.get('endereco.cep').value;

    cep = this.cepDesmasc.transform(cep);

    this.service.buscarPorCep(cep).subscribe(endereco => {
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

      this.setInquilinoModel();

      this.service.atualizar(this.inq).subscribe(res => {

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

  private setInquilinoModel(){

    let dados = this.formulario.value;

    this.inq = {
      idPessoa:  (dados.idPessoa === '0') ? null : dados.idPessoa,
      tipoPessoa: "1",
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
      ativo: true,
      contatos: [
        {
          idContato: (dados.idPessoa === '0') ? null : dados.contatos.idTelefone,
          tipoContato: "1",
          numero: this.telDesmasc.transform(dados.contatos.telefone)
        },
        {
          idContato: (dados.idPessoa === '0') ? null : dados.contatos.idCelular,
          tipoContato: "2",
          numero: this.celDesmasc.transform(dados.contatos.celular)
        }
      ],
      endereco: {
        cep: this.cepDesmasc.transform(dados.endereco.cep),
        logradouro: dados.endereco.logradouro,
        complemento: (dados.endereco.complemento != "") ? dados.endereco.complemento: null,
        bairro: dados.endereco.bairro,
        cidade: dados.endereco.cidade,
        estado: dados.endereco.estado,
        numero: dados.endereco.numero,
      },
      
    };
    
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
